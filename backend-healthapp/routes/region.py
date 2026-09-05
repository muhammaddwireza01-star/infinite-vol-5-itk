from flask import Blueprint, request, jsonify, current_app
from functools import wraps
import jwt

# Import instance database serta model User dan Region
from database.db import db
from models.user import User
from models.region import Region

region_bp = Blueprint('region', __name__)

# ==========================================
# DECORATOR JWT (Memastikan User Sudah Login)
# ==========================================
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(" ")[1]
        
        if not token:
            return jsonify({'status': 'error', 'message': 'Akses ditolak! Token JWT tidak ditemukan.'}), 401
        
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data['user_id']
        except Exception as e:
            return jsonify({'status': 'error', 'message': 'Token tidak valid atau sudah kadaluarsa!'}), 401
            
        return f(current_user_id, *args, **kwargs)
    return decorated

# ==========================================
# ENDPOINT: POST /api/kirim_wilayah (SPRINT 5)
# ==========================================
@region_bp.route('/kirim_wilayah', methods=['POST'])
@token_required  # Endpoint ini wajib diproteksi karena harus tahu milik user mana
def kirim_wilayah(current_user_id):
    try:
        data = request.get_json()
        
        if not data or not data.get('region_name'):
            return jsonify({"status": "error", "message": "Nama wilayah (region_name) wajib dikirim!"}), 400

        region_name = data.get('region_name').strip().title() # Format string agar seragam (misal: "jakarta" -> "Jakarta")

        # 1. Cek apakah wilayah ini sudah ada di tabel regions
        region = Region.query.filter_by(name=region_name).first()
        
        # 2. Jika belum ada, buat record wilayah baru di database
        if not region:
            region = Region(name=region_name)
            db.session.add(region)
            db.session.commit() # Commit dulu agar region mendapat ID

        # 3. Hubungkan User dengan Wilayah tersebut
        user = User.query.get(current_user_id)
        if user:
            user.region_id = region.id
            db.session.commit()
            
            return jsonify({
                "status": "success",
                "message": f"Wilayah berhasil diatur ke {region.name}",
                "data": {
                    "user_id": user.id,
                    "username": user.username,
                    "region": region.name
                }
            }), 200
        else:
            return jsonify({"status": "error", "message": "User tidak ditemukan!"}), 404

    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500