import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Mengimpor instance database (asumsi menggunakan Flask-SQLAlchemy di database/db.py)
from database.db import db 

# Mengimpor Blueprints dari folder routes/
from routes.auth import auth_bp
from routes.region import region_bp
from routes.aqi import aqi_bp

def create_app():
    # Load variabel environment dari file .env
    load_dotenv()

    # Inisialisasi aplikasi Flask
    app = Flask(__name__)

    # Mengaktifkan CORS agar frontend (React/Vite) bisa melakukan request tanpa diblokir
    CORS(app)

    # Konfigurasi Database (MySQL) & Keamanan (JWT/Session)
    # URL format: mysql+pymysql://username:password@localhost/nama_database
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///fallback.db') 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'airwise-secret-key-hackathon')

    # Mengikat (bind) instance database dengan aplikasi Flask
    db.init_app(app)

    # Mendaftarkan Routes (Blueprints)
    # Semua endpoint di dalam blueprint ini akan otomatis memiliki awalan '/api'
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(region_bp, url_prefix='/api')
    app.register_blueprint(aqi_bp, url_prefix='/api')

    # Endpoint Health Check (Sesuai dengan Sprint 1 di alur_pengerjaan.txt)
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "success",
            "message": "Backend AIRWISE Flask is running and healthy!"
        }), 200

    return app

if __name__ == '__main__':
    app = create_app()
    
    # Berjalan di port 5000 dan mode debug agar mudah di-trace saat hackathon
    app.run(host='0.0.0.0', port=5000, debug=True)