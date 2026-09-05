# Isi minimal dari services/aqi_service.py

def get_current_aqi_for_region(region_name):
    # TODO: Integrasikan dengan services/udaraku_service.py di sini nanti.
    # Untuk sementara kita kembalikan mock data (data dummy) agar API tidak error.
    return {
        "wilayah": region_name,
        "aqi_score": 85,
        "status": "Sedang",
        "polutan_utama": "PM2.5",
        "rekomendasi_kesehatan": "Kelompok sensitif sebaiknya mengurangi aktivitas fisik yang berat di luar ruangan."
    }

def get_aqi_history_for_region(region_name):
    # TODO: Ambil dari MySQL (tabel aqi_history) nanti di Sprint 3.
    # Mock data sementara.
    return [
        {"tanggal": "2026-09-01", "aqi_score": 70},
        {"tanggal": "2026-09-02", "aqi_score": 90},
        {"tanggal": "2026-09-03", "aqi_score": 85},
        {"tanggal": "2026-09-04", "aqi_score": 110},
    ]