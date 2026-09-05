import csv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CSV_FILE_PATH = BASE_DIR / "data" / "ispu_seluruh_kota_kalimantan.csv"


def get_aqi_properties(aqi):
    """Menerjemahkan skor AQI menjadi informasi dan kode warna untuk UI."""
    if aqi <= 50:
        return {
            "status_kategori": "Baik",
            "keterangan_gauge": "Kualitas Udara Sangat Baik",
            "kode_warna": "#22c55e", # Hijau
            "visibilitas": "Jelas",
            "kejernihan_langit": "Sangat Baik",
            "status_analisis": "Aman",
            "saran_kesehatan": (
                "Kualitas udara sangat baik. Ideal untuk aktivitas luar ruangan."
            ),
        }

    elif aqi <= 100:
        return {
            "status_kategori": "Sedang",
            "keterangan_gauge": "Kualitas Udara Sedang",
            "kode_warna": "#eab308", # Kuning
            "visibilitas": "Normal",
            "kejernihan_langit": "Biasa",
            "status_analisis": "Perhatian",
            "saran_kesehatan": (
                "Kelompok sensitif sebaiknya mengurangi aktivitas fisik "
                "yang berat di luar ruangan."
            ),
        }

    elif aqi <= 150:
        return {
            "status_kategori": "Tidak Sehat",
            "keterangan_gauge": "Tidak Sehat bagi Kelompok Sensitif",
            "kode_warna": "#f97316", # Oranye
            "visibilitas": "Rendah",
            "kejernihan_langit": "Buruk",
            "status_analisis": "Perlu Waspada",
            "saran_kesehatan": (
                "Hindari aktivitas luar ruangan terutama bagi kelompok sensitif "
                "seperti anak-anak dan lansia."
            ),
        }

    elif aqi <= 200:
        return {
            "status_kategori": "Sangat Tidak Sehat",
            "keterangan_gauge": "Sangat Tidak Sehat",
            "kode_warna": "#ef4444", # Merah
            "visibilitas": "Sangat Rendah",
            "kejernihan_langit": "Sangat Buruk",
            "status_analisis": "Bahaya",
            "saran_kesehatan": (
                "Hentikan semua aktivitas luar ruangan. Gunakan masker N95 "
                "jika terpaksa keluar."
            ),
        }

    else:
        return {
            "status_kategori": "Berbahaya",
            "keterangan_gauge": "Berbahaya bagi Semua",
            "kode_warna": "#a855f7", # Ungu
            "visibilitas": "Gelap/Berkabut",
            "kejernihan_langit": "Tertutup Kabut Asap",
            "status_analisis": "Sangat Bahaya",
            "saran_kesehatan": "Tetap di dalam rumah. Tutup semua ventilasi.",
        }


def _normalize_region(region_name):
    """Normalisasi nama wilayah agar pencarian tidak sensitif huruf besar/kecil."""
    if region_name is None:
        return ""
    return str(region_name).strip().casefold()


def _read_csv_rows():
    """
    Membaca CSV dari folder data pada root project.
    """
    if not CSV_FILE_PATH.exists():
        raise FileNotFoundError(
            f"File CSV tidak ditemukan: {CSV_FILE_PATH}"
        )

    with CSV_FILE_PATH.open(mode="r", encoding="utf-8-sig", newline="") as file:
        for _ in range(3):
            next(file, None)

        reader = csv.DictReader(file)

        if reader.fieldnames is None:
            raise ValueError("Header CSV tidak ditemukan.")

        required_columns = {
            "Kota",
            "Index ISPU Saat Ini",
            "Polutan Utama",
            "Tanggal Histori",
            "Jam Histori",
            "ISPU Histori",
        }

        missing_columns = required_columns - set(reader.fieldnames)
        if missing_columns:
            raise ValueError(
                "Kolom CSV tidak lengkap. Kolom yang hilang: "
                + ", ".join(sorted(missing_columns))
            )

        return list(reader)


def get_current_aqi_for_region(region_name):
    current_data = None
    comparison_data = []
    target_region = _normalize_region(region_name)

    try:
        rows = _read_csv_rows()

        for row in rows:
            kota_raw = row.get("Kota", "")
            kota = kota_raw.strip().title()

            if not kota:
                continue

            try:
                aqi_score = int(float(row["Index ISPU Saat Ini"]))
            except (ValueError, TypeError):
                continue

            # Masukkan detail kota beserta properti warnanya untuk frontend
            if not any(d["wilayah"] == kota for d in comparison_data):
                city_properties = get_aqi_properties(aqi_score)
                comparison_data.append({
                    "wilayah": kota,
                    "aqi": aqi_score,
                    "kategori": city_properties["status_kategori"],
                    "kode_warna": city_properties["kode_warna"]
                })

            # Ambil data wilayah yang diminta (hanya untuk satu wilayah).
            if (
                _normalize_region(kota) == target_region
                and current_data is None
            ):
                properties = get_aqi_properties(aqi_score)

                current_data = {
                    "wilayah": kota,
                    "aqi_score": aqi_score,
                    "polutan_utama": row.get("Polutan Utama", "").strip(),
                    "waktu_update": (
                        f'{row.get("Tanggal Histori", "").strip()} • '
                        f'{row.get("Jam Histori", "").strip()} WIB'
                    ),
                    **properties,
                }

        # Urutkan dari AQI tertinggi ke terendah untuk list perbandingan.
        comparison_data.sort(
            key=lambda x: x["aqi"],
            reverse=True,
        )

    except Exception as e:
        print(f"Error membaca CSV: {e}")
        return None

    if current_data:
        # Top 5 kota untuk komponen perbandingan wilayah lain.
        current_data["perbandingan"] = comparison_data[:5]

    return current_data


def get_aqi_history_for_region(region_name):
    """
    Mengambil histori ISPU per jam untuk kebutuhan grafik.

    Rentang grafik yang digunakan:
        02:00 sampai 19:00

    Catatan:
    - Fungsi hanya menggunakan data yang benar-benar tersedia di CSV.
    - Jika suatu jam belum mempunyai data, jam tersebut tetap dikembalikan
      dengan nilai None agar frontend mengetahui bahwa titik tersebut kosong.
    - Tidak ada nilai ISPU yang dibuat-buat/diestimasi di layer service.
      Nilai histori harus berasal dari CSV atau sumber data histori yang valid.
    """
    target_region = _normalize_region(region_name)

    # Jam yang memang dibutuhkan oleh grafik.
    target_intervals = [
        f"{hour:02d}:00"
        for hour in range(2, 20)
    ]

    history_by_hour = {}
    tanggal_histori = ""

    try:
        rows = _read_csv_rows()

        for row in rows:
            kota = row.get("Kota", "").strip().title()
            jam = row.get("Jam Histori", "").strip()

            if (
                _normalize_region(kota) != target_region
                or jam not in target_intervals
            ):
                continue

            # Ambil tanggal histori dari data yang cocok.
            if not tanggal_histori:
                tanggal_histori = row.get("Tanggal Histori", "").strip()

            # Jika terdapat duplikasi jam, gunakan baris pertama yang valid.
            if jam in history_by_hour:
                continue

            raw_aqi = row.get("ISPU Histori", "").strip()

            try:
                aqi = int(float(raw_aqi))
            except (ValueError, TypeError):
                aqi = None

            history_by_hour[jam] = {
                "jam": jam,
                "aqi": aqi,
            }

        history_data = [
            history_by_hour.get(
                jam,
                {
                    "jam": jam,
                    "aqi": None,
                },
            )
            for jam in target_intervals
        ]

    except Exception as e:
        print(f"Error membaca history: {e}")

        history_data = [
            {
                "jam": jam,
                "aqi": None,
            }
            for jam in target_intervals
        ]

    return {
        "tanggal": tanggal_histori,
        "data_per_jam": history_data,
    }