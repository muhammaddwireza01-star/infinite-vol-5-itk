from flask import Blueprint, request, jsonify
from services.predict_service import predict_from_image

predict_bp = Blueprint('predict', __name__)

# Tipe file yang diizinkan
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


def _allowed_file(filename):
    """Cek apakah ekstensi file diizinkan."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# ==========================================
# ENDPOINT: POST /api/predict
# ==========================================
@predict_bp.route('/predict', methods=['POST'])
def predict_image():
    """
    Menerima gambar langit via multipart/form-data,
    menjalankan model AI, dan mengembalikan prediksi
    AQI, visibilitas, kejernihan, dan warna langit.

    Request:
        - Form field 'image': file gambar (JPG/PNG/WebP, maks 5MB)

    Response:
        {
            "status": "success",
            "data": {
                "aqi": 126,
                "visibilitas": "Rendah",
                "kejernihan_langit": "Buruk",
                "warna_langit": "Kecokelatan",
                "status": "Perlu Waspada",
                "rekomendasi": "...",
                ...
            }
        }
    """
    try:
        # Validasi: file harus ada
        if 'image' not in request.files:
            return jsonify({
                "status": "error",
                "message": "Field 'image' tidak ditemukan. Kirim gambar via form-data."
            }), 400

        file = request.files['image']

        if file.filename == '':
            return jsonify({
                "status": "error",
                "message": "Nama file kosong. Pilih file gambar yang valid."
            }), 400

        # Validasi: tipe file
        if not _allowed_file(file.filename):
            return jsonify({
                "status": "error",
                "message": f"Tipe file tidak didukung. Gunakan: {', '.join(ALLOWED_EXTENSIONS)}"
            }), 400

        # Baca file bytes
        image_bytes = file.read()

        # Validasi: ukuran file
        if len(image_bytes) > MAX_FILE_SIZE:
            return jsonify({
                "status": "error",
                "message": "Ukuran file melebihi batas maksimal 5MB."
            }), 400

        if len(image_bytes) == 0:
            return jsonify({
                "status": "error",
                "message": "File gambar kosong."
            }), 400

        # Jalankan prediksi model
        result = predict_from_image(image_bytes)

        # Cek apakah gambar terdeteksi indoor
        if result.get("is_indoor"):
            return jsonify({
                "status": "error",
                "message": result.get("message")
            }), 400

        return jsonify({
            "status": "success",
            "message": "Analisis foto berhasil",
            "data": result
        }), 200

    except FileNotFoundError as e:
        return jsonify({
            "status": "error",
            "message": f"Model belum tersedia: {str(e)}"
        }), 503

    except Exception as e:
        print(f"Error saat prediksi: {e}")
        return jsonify({
            "status": "error",
            "message": f"Terjadi kesalahan saat menganalisis foto: {str(e)}"
        }), 500
