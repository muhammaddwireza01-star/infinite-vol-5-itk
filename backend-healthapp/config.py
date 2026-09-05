import os
from dotenv import load_dotenv

# Memuat variabel environment dari berkas .env
load_dotenv()

class Config:
    """Konfigurasi Dasar (Base Configuration)"""
    # Kunci rahasia untuk enkripsi token JWT (Sprint 4)
    SECRET_KEY = os.getenv('SECRET_KEY', 'airwise-rahasia-hackathon-2026')
    
    # Konfigurasi Database MySQL (Sprint 3)
    # Format URI MySQL: mysql+pymysql://username:password@localhost/nama_database
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///fallback.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # URL Endpoint External (Sprint 2 - Data UdaraKu Kemenperin)
    UDARAKU_API_URL = os.getenv('UDARAKU_API_URL', 'https://api-dummy.udaraku.go.id')

class DevelopmentConfig(Config):
    """Konfigurasi untuk mode Development (Saat Hackathon)"""
    DEBUG = True

class ProductionConfig(Config):
    """Konfigurasi untuk mode Production (Saat Demo/Live)"""
    DEBUG = False
    # Memaksa aplikasi gagal berjalan jika DATABASE_URI tidak diatur di production
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')

# Mapping konfigurasi agar mudah dipanggil
config_dict = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}