import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io
from pathlib import Path

# ==========================================
# KONFIGURASI MODEL
# ==========================================

# Path ke file model yang sudah di-training
MODEL_PATH = Path(__file__).resolve().parent.parent.parent / "frontend-healthapp" / "Model" / "best_model.pth"

# Range AQI dari training (sesuai test_results.json)
AQI_MIN = 0
AQI_MAX = 150

# Label kelas (berdasarkan dataset asli yang di-sort alphabetical)
VISIBILITY_LABELS = ["Tinggi", "Sedang", "Rendah"]
CLARITY_LABELS = ["Baik", "Cukup", "Buruk"]
COLOR_LABELS = ["Biru Cerah", "Keabu-abuan", "Kecokelatan", "Abu-abu Gelap"]

# Preprocessing standar ImageNet
IMAGE_TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])


# ==========================================
# ARSITEKTUR MODEL (ResNet18 Multi-Head)
# ==========================================
class ConvBlock(nn.Module):
    def __init__(self, in_c, out_c):
        super().__init__()
        self.block = nn.Sequential(
            nn.Conv2d(in_c, out_c, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_c),
            nn.ReLU(),
            nn.Conv2d(out_c, out_c, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_c),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )
    def forward(self, x):
        return self.block(x)


class AirQualityModel(nn.Module):
    """
    Model multi-task kustom berbasis CNN untuk prediksi kualitas udara.
    """
    def __init__(self):
        super().__init__()
        
        self.backbone = nn.Sequential(
            ConvBlock(3, 32),
            ConvBlock(32, 64),
            ConvBlock(64, 128),
            ConvBlock(128, 256),
            ConvBlock(256, 512),
        )
        
        self.pool = nn.AdaptiveAvgPool2d((1, 1))
        
        self.shared_fc = nn.Sequential(
            nn.Linear(512, 256),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5)
        )
        
        self.head_aqi = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.25),
            nn.Linear(128, 1)
        )
        
        self.head_visibility = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.25),
            nn.Linear(128, len(VISIBILITY_LABELS))
        )
        
        self.head_clarity = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.25),
            nn.Linear(128, len(CLARITY_LABELS))
        )
        
        self.head_color = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.25),
            nn.Linear(128, len(COLOR_LABELS))
        )

    def forward(self, x):
        x = self.backbone(x)
        x = self.pool(x)
        x = torch.flatten(x, 1)
        x = self.shared_fc(x)
        return {
            "aqi": self.head_aqi(x),
            "visibility": self.head_visibility(x),
            "clarity": self.head_clarity(x),
            "color": self.head_color(x),
        }


# ==========================================
# SINGLETON MODEL INSTANCE
# ==========================================
_model = None
_device = None


def _get_device():
    """Pilih GPU jika tersedia, fallback ke CPU."""
    if torch.cuda.is_available():
        return torch.device("cuda")
    return torch.device("cpu")


def load_model():
    """
    Load model dari file .pth (lazy singleton).
    Dipanggil sekali saat request pertama.
    """
    global _model, _device

    if _model is not None:
        return _model, _device

    _device = _get_device()
    _model = AirQualityModel()

    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"File model tidak ditemukan: {MODEL_PATH}\n"
            "Pastikan file best_model.pth ada di folder frontend-healthapp/Model/"
        )

    # Load weights
    state_dict = torch.load(MODEL_PATH, map_location=_device, weights_only=False)

    # Jika checkpoint disimpan dengan key 'model_state_dict' (common pattern)
    if isinstance(state_dict, dict) and "model_state_dict" in state_dict:
        state_dict = state_dict["model_state_dict"]

    _model.load_state_dict(state_dict, strict=False)
    _model.to(_device)
    _model.eval()

    print(f"Model AIRWISE berhasil di-load pada {_device}")
    return _model, _device


# ==========================================
# FUNGSI PREDIKSI
# ==========================================
def _get_status_and_recommendation(aqi_score):
    """
    Mengembalikan status, warna, dan rekomendasi berdasarkan skor AQI.
    Mengikuti pola yang sudah ada di aqi_services.py.
    """
    if aqi_score <= 50:
        return {
            "status": "Aman",
            "status_label": "Baik",
            "status_bg": "#dcfce7",
            "status_color": "#15803d",
            "badge_class": "badge-green",
            "rekomendasi": "✅ Kualitas udara sangat baik. Ideal untuk aktivitas luar ruangan.",
            "rekomendasi_type": "success",
        }
    elif aqi_score <= 100:
        return {
            "status": "Perhatian",
            "status_label": "Sedang",
            "status_bg": "#fef9c3",
            "status_color": "#854d0e",
            "badge_class": "badge-yellow",
            "rekomendasi": "⚠️ Kelompok sensitif sebaiknya mengurangi aktivitas fisik berat di luar ruangan.",
            "rekomendasi_type": "warning",
        }
    elif aqi_score <= 150:
        return {
            "status": "Perlu Waspada",
            "status_label": "Tidak Sehat",
            "status_bg": "#fef3c7",
            "status_color": "#92400e",
            "badge_class": "badge-amber",
            "rekomendasi": "⚠️ Hindari aktivitas luar ruangan terutama bagi kelompok sensitif. Gunakan masker bila mendesak bepergian.",
            "rekomendasi_type": "warning",
        }
    else:
        return {
            "status": "Bahaya",
            "status_label": "Sangat Tidak Sehat",
            "status_bg": "#fee2e2",
            "status_color": "#b91c1c",
            "badge_class": "badge-red",
            "rekomendasi": "🚨 Hentikan semua aktivitas luar ruangan. Gunakan masker N95 jika terpaksa keluar.",
            "rekomendasi_type": "danger",
        }


def predict_from_image(image_bytes):
    """
    Menerima bytes gambar, menjalankan inferensi model, dan mengembalikan
    hasil prediksi lengkap sebagai dictionary.

    Args:
        image_bytes: bytes dari file gambar yang di-upload

    Returns:
        dict dengan keys: aqi, visibility, clarity, color, status, rekomendasi, dsb.
    """
    model, device = load_model()

    # Buka gambar dan konversi ke RGB
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Preprocessing
    input_tensor = IMAGE_TRANSFORM(image).unsqueeze(0).to(device)

    # Inferensi
    with torch.no_grad():
        outputs = model(input_tensor)

    # Parse output: AQI (regresi)
    aqi_normalized = outputs["aqi"].item()  # Nilai antara 0–1
    aqi_score = round(aqi_normalized * (AQI_MAX - AQI_MIN) + AQI_MIN)
    aqi_score = max(AQI_MIN, min(AQI_MAX, aqi_score))  # Clamp

    # Parse output: Klasifikasi
    visibility_idx = torch.argmax(outputs["visibility"], dim=1).item()
    clarity_idx = torch.argmax(outputs["clarity"], dim=1).item()
    color_idx = torch.argmax(outputs["color"], dim=1).item()

    visibility_label = VISIBILITY_LABELS[visibility_idx]
    clarity_label = CLARITY_LABELS[clarity_idx]
    color_label = COLOR_LABELS[color_idx]

    # Confidence scores
    visibility_confidence = torch.softmax(outputs["visibility"], dim=1).max().item()
    clarity_confidence = torch.softmax(outputs["clarity"], dim=1).max().item()
    color_confidence = torch.softmax(outputs["color"], dim=1).max().item()

    # Status dan rekomendasi
    status_info = _get_status_and_recommendation(aqi_score)

    return {
        "aqi": aqi_score,
        "visibilitas": visibility_label,
        "kejernihan_langit": clarity_label,
        "warna_langit": color_label,
        "confidence": {
            "visibilitas": round(visibility_confidence * 100, 1),
            "kejernihan": round(clarity_confidence * 100, 1),
            "warna": round(color_confidence * 100, 1),
        },
        **status_info,
    }
