import { useState } from "react";
import EdukasiModal from "../EdukasiModal";

import akarIconsShield from "../../assets/icons/akar-icons_shield.svg";
import statisticUp from "../../assets/icons/akar-icons_statistic-up.svg";
import boxiconsAir from "../../assets/icons/boxicons_air.svg";
import fluentDust from "../../assets/icons/fluent_dust-24-regular.svg";
import fluentPerson from "../../assets/icons/fluent_person-running-20-regular.svg";
import fluentMd from "../../assets/icons/fluent-mdl2_dictionary.svg";
import lungs from "../../assets/icons/hugeicons_lungs.svg";
import mask from "../../assets/icons/carbon_face-mask.svg";

const eduCards = [
  {
    icon: boxiconsAir,
    iconBg: "#eff6ff",
    iconColor: "#2563eb",
    title: "Apa itu AQI?",
    desc: "AQI (Air Quality Index) adalah indeks untuk menunjukkan tingkat kualitas udara dan dampaknya bagi kesehatan.",
    modalContent:
      "AQI (Air Quality Index) merupakan satuan standar internasional untuk mengukur seberapa bersih atau tercemarnya udara di suatu wilayah. Semakin tinggi nilai AQI, semakin besar pula tingkat polusi dan risiko kesehatan bagi manusia.",
  },
  {
    icon: fluentDust,
    iconBg: "#fffbeb",
    iconColor: "#d97706",
    title: "Mengenal PM2.5 & PM10",
    desc: "Partikel halus yang dapat masuk ke sistem pernapasan dan berbahaya pada paru-paru serta pembuluh darah.",
    modalContent:
      "PM2.5 adalah partikel mikroskopis berdiameter kurang dari 2.5 mikrometer yang dapat terhirup jauh ke dalam organ paru-paru hingga peredaran darah, memicu iritasi saluran napas hingga masalah kardiovaskular kronis.",
  },
  {
    icon: lungs,
    iconBg: "#fff1f2",
    iconColor: "#e11d48",
    title: "Dampak Polusi Udara",
    desc: "Polusi udara dapat menyebabkan berbagai gangguan kesehatan, mulai dari ringan hingga kasus serius kronis.",
    modalContent:
      "Paparan polusi udara berkepanjangan dapat memicu asma, bronkitis, infeksi saluran pernapasan atas (ISPA), hingga meningkatkan risiko penyakit jantung koroner dan stroke terutama pada lansia dan balita.",
  },
  {
    icon: akarIconsShield,
    iconBg: "#f0fdf4",
    iconColor: "#16a34a",
    title: "Cara Melindungi Diri",
    desc: "Tips sederhana untuk melindungi diri dari paparan polusi udara sehari-hari saat beraktivitas di luar rumah.",
    modalContent:
      "Selalu cek indeks AQI harian sebelum berolahraga, gunakan air purifier di ruang keluarga, pasang masker berstandar respirator, serta jaga daya tahan tubuh dengan hidrasi optimal.",
  },
  {
    icon: mask,
    iconBg: "#f0f9ff",
    iconColor: "#0284c7",
    title: "Kapan Pakai Masker?",
    desc: "Ketahui kondisi AQI yang memerlukan penggunaan masker untuk perlindungan pernapasan yang efektif.",
    modalContent:
      "Jika indeks AQI melebihi angka 100 (Kategori Tidak Sehat bagi Kelompok Sensitif) atau ketika tampak kabut asap tebal, disarankan menggunakan masker standar medis KF94 atau N95 yang pas di hidung dan pipi.",
  },
  {
    icon: fluentPerson,
    iconBg: "#eef2ff",
    iconColor: "#4f46e5",
    title: "Aktivitas yang Dihindari?",
    desc: "Aktivitas luar ruangan yang sebaiknya dihindari saat kualitas udara berada dalam status tidak baik.",
    modalContent:
      "Hindari lari maraton di luar ruangan, bersepeda di jalur padat kendaraan bermotor, atau membiarkan ventilasi rumah terbuka lebar saat asap kebakaran hutan tercium di lingkunganmu.",
  },
  {
    icon: statisticUp,
    iconBg: "#fffbeb",
    iconColor: "#d97706",
    title: "Cara Membaca Indikator",
    desc: "Pahami arti warna dan angka pada indikator kualitas udara (AQI) secara tepat dan akurat.",
    modalContent:
      "Hijau (0-50 Baik), Kuning (51-100 Sedang), Oranye (101-150 Perlu Waspada), Merah (151-200 Tidak Sehat), Ungu (201-300 Sangat Tidak Sehat), dan Marun (>300 Berbahaya).",
  },
  {
    icon: fluentMd,
    iconBg: "#f0fdfa",
    iconColor: "#0d9488",
    title: "Glosarium",
    desc: "Daftar istilah penting seputar kualitas udara dan lingkungan biar pengetahuanmu makin cerdas.",
    modalContent:
      "Daftar istilah penting: Inversi Suhu (lapisan udara hangat menahan polutan di dekat tanah), ISPU (Indeks Standar Pencemar Udara), Aerosol (partikel cair/padat tersuspensi di udara), dan FIRMS (Fire Information for Resource Management System).",
  },
];

const EdukasiTab = () => {
  const [modal, setModal] = useState({ isOpen: false, title: "", content: "" });

  const openModal = (title, content) =>
    setModal({ isOpen: true, title, content });
  const closeModal = () => setModal({ isOpen: false, title: "", content: "" });

  return (
    <div className="tab-section">
      <div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#0f172a",
            letterSpacing: "-0.025em",
          }}>
          Edukasi
        </h2>
        <p style={{ fontSize: "14px", color: "#64748b" }}>
          Mari belajar tentang kualitas udara dan cara menjaganya.
        </p>
      </div>

      <div className="grid-4">
        {eduCards.map((card, i) => (
          <div key={i} className="edu-card">
            <div>
              <div
                className="edu-card-icon"
                style={{ background: card.iconBg, color: card.iconColor }}>
                <img src={card.icon} alt="" />
              </div>
              <h4
                style={{
                  fontWeight: 700,
                  color: "#1e293b",
                  fontSize: "14px",
                  marginBottom: "6px",
                }}>
                {card.title}
              </h4>
              <p
                style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.6 }}>
                {card.desc}
              </p>
            </div>
            <button
              className="edu-card-btn"
              onClick={() => openModal(card.title, card.modalContent)}>
              Baca Selengkapnya
            </button>
          </div>
        ))}
      </div>

      <EdukasiModal
        isOpen={modal.isOpen}
        title={modal.title}
        content={modal.content}
        onClose={closeModal}
      />
    </div>
  );
};

export default EdukasiTab;
