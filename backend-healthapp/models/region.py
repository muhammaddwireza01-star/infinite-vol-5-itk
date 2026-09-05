# Isi dari models/region.py
from database.db import db

class Region(db.Model):
    __tablename__ = 'regions'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    
    # Opsional: Bisa ditambahkan kolom koordinat jika API UdaraKu butuh lat/long
    # latitude = db.Column(db.Float, nullable=True)
    # longitude = db.Column(db.Float, nullable=True)