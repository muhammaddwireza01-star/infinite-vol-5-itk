from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Import konfigurasi
from config import config_dict

# Import database
from database.db import db

# Import Blueprints
from routes.auth import auth_bp
from routes.region import region_bp
from routes.aqi import aqi_bp
from routes.predict import predict_bp


def create_app(config_name='default'):
    # Load variabel environment dari file .env
    load_dotenv()

    # Inisialisasi aplikasi Flask
    app = Flask(__name__)

    # Mengaktifkan CORS agar frontend (React/Vite)
    # bisa melakukan request ke backend
    CORS(app)

    # Memuat konfigurasi dari config.py
    app.config.from_object(config_dict[config_name])

    # Mengikat instance database dengan aplikasi Flask
    db.init_app(app)

    # Mendaftarkan Routes (Blueprints)
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(region_bp, url_prefix='/api')
    app.register_blueprint(aqi_bp, url_prefix='/api')
    app.register_blueprint(predict_bp, url_prefix='/api')

    # Endpoint Health Check
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "success",
            "message": "Backend AIRWISE Flask is running and healthy!"
        }), 200

    return app


if __name__ == '__main__':
    app = create_app('development')

    # Berjalan di port 5000
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )