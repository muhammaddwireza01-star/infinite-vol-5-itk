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


def create_app(config_name='default'):
    load_dotenv()

    app = Flask(__name__)

    CORS(app)

    app.config.from_object(config_dict[config_name])

    db.init_app(app)

    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(region_bp, url_prefix='/api')
    app.register_blueprint(aqi_bp, url_prefix='/api')

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "success",
            "message": "Backend AIRWISE Flask is running and healthy!"
        }), 200

    return app


if __name__ == '__main__':
    app = create_app('development')

    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )