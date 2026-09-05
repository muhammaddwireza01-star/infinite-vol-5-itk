from flask import Blueprint, request, jsonify, current_app
from functools import wraps
import jwt

# Asumsi: Anda akan membuat fungsi ini di services/aqi_service.py (Prioritas 2)
from services.aqi_services import get_current_aqi_for_region, get_aqi_history_for_region

aqi_bp = Blueprint('aqi', __name__)

# ==========================================
# DECORATOR JWT (SPRINT 4 - PROTECTED ROUTE)
# ==========================================
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Cek apakah ada header Authorization
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(" ")[1]
        
        if not token:
            return jsonify({'status': 'error', 'message': 'Token JWT tidak ditemukan!'}), 401
        
        try:
            # Decode token
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data['user_id']
        except Exception as e:
            return jsonify({'status': 'error', 'message': 'Token tidak valid atau kadaluarsa!'}), 401
            
        return f(current_user_id, *args, **kwargs)
    return decorated

# ==========================================
# ENDPOINT: GET /api/get_data_aqi (SPRINT 2)
# ==========================================
@aqi_bp.route('/get_data_aqi', methods=['GET'])
# @token_required # Hapus tanda pagar (#) ini nanti saat Sprint 4 selesai untuk memproteksi endpoint
def get_data_aqi(*args): # *args digunakan untuk menangkap current_user_id jika @token_required diaktifkan
    try:
        # Mengambil parameter region dari URL, contoh: /api/get_data_aqi?region=Balikpapan
        region_name = request.args.get('region')
        
        if not region_name:
            return jsonify({
                "status": "error", 
                "message": "Parameter 'region' wajib disertakan!"
            }), 400

        # Memanggil service (yang nantinya mengambil data dari UdaraKu Kemenperin)
        aqi_data = get_current_aqi_for_region(region_name)

        if not aqi_data:
            return jsonify({
                "status": "error",
                "message": f"Data kualitas udara untuk wilayah {region_name} tidak ditemukan."
            }), 404

        return jsonify({
            "status": "success",
            "message": "Data kualitas udara berhasil diambil",
            "data": aqi_data
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==========================================
# ENDPOINT: GET /api/history (SPRINT 3 & 4)
# ==========================================
@aqi_bp.route('/history', methods=['GET'])
# @token_required 
def get_history(*args):
    try:
        region_name = request.args.get('region')
        
        if not region_name:
            return jsonify({
                "status": "error", 
                "message": "Parameter 'region' wajib disertakan!"
            }), 400

        # Memanggil service untuk menarik data riwayat dari database MySQL
        history_data = get_aqi_history_for_region(region_name)

        return jsonify({
            "status": "success",
            "message": "Data historis berhasil diambil",
            "data": history_data
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500