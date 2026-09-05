from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

# Import instance database dan model User
from database.db import db
from models.user import User

# Inisialisasi Blueprint untuk auth
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validasi input dasar
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({"status": "error", "message": "Username dan password wajib diisi!"}), 400

        username = data.get('username')
        password = data.get('password')

        # Cek apakah user sudah ada di database
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({"status": "error", "message": "Username sudah terdaftar!"}), 409

        # Hashing password (Sprint 4 requirement)
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        # Buat user baru
        new_user = User(
            username=username,
            password=hashed_password
            # Wilayah bisa ditambahkan di sini jika dikirim saat register, 
            # atau nanti melalui endpoint /api/kirim_wilayah (Sprint 5)
        )

        # Simpan ke database MySQL
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "status": "success", 
            "message": "Registrasi berhasil!",
            "user_id": new_user.id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data or not data.get('username') or not data.get('password'):
            return jsonify({"status": "error", "message": "Username dan password wajib diisi!"}), 400

        username = data.get('username')
        password = data.get('password')

        # Cari user di database
        user = User.query.filter_by(username=username).first()

        # Verifikasi user dan kecocokan hash password
        if not user or not check_password_hash(user.password, password):
            return jsonify({"status": "error", "message": "Username atau password salah!"}), 401

        # Generate JWT Token (Sprint 4 requirement)
        # Token berlaku selama 24 jam
        token_payload = {
            'user_id': user.id,
            'username': user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        
        token = jwt.encode(token_payload, current_app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({
            "status": "success",
            "message": "Login berhasil!",
            "token": token
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500