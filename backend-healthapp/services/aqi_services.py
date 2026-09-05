from pathlib import Path
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent.parent

CSV_PATH = (
    BASE_DIR
    / "services"
    / "data"
    / "ispu_seluruh_kota_kalimantan.csv"
)


def get_current_aqi_for_region(region_name):
    try:
        df = pd.read_csv(
            CSV_PATH,
            skiprows=3
        )

        # Bersihkan nama kolom
        df.columns = df.columns.str.strip()

        # Bersihkan nama kota
        df["Kota"] = df["Kota"].astype(str).str.strip()

        # Cari kota
        city_data = df[
            df["Kota"].str.lower() == region_name.strip().lower()
        ]

        if city_data.empty:
            return None

        # Ambil baris pertama karena
        # Index ISPU Saat Ini sama untuk setiap histori kota
        row = city_data.iloc[0]

        return {
            "city": row["Kota"],
            "aqi": int(row["Index ISPU Saat Ini"]),
            "status": row["Status Utama"],
            "pollutant": row["Polutan Utama"]
        }

    except Exception as e:
        print(f"Error membaca data AQI: {e}")
        return None