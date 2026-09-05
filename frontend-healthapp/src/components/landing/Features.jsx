import Card from "./Card";

const Features = () => {
  const contents = [
    {
      ilustration: "◉",
      title: "Pantauan Real-time",
      desc: "Lihat kondisi udara di sekitarmu secara langsung dengan data yang mudah dipahami.",
      details: ["Pelajari lebih lanjut →"],
    },
    {
      ilustration: "⌁",
      title: "Analisis Foto Udara",
      desc: "Unggah foto untuk mendapatkan analisis kondisi udara.",
      details: ["Pelajari lebih lanjut →"],
    },
    {
      ilustration: "♥",
      title: "Pola & Tren",
      desc: "Lihat perubahan kualitas udara dari waktu ke waktu.",
      details: ["Pelajari lebih lanjut →"],
    },
    {
      ilustration: "✦",
      title: "Edukasi Kesehatan",
      desc: "Dapatkan informasi yang membantu menjaga kesehatan Anda.",
      details: ["Pelajari lebih lanjut →"],
    },
  ];

  return (
    <section id="features" className="landing-section features-section">
      <div className="flex flex-col gap-4">
        <span className="eyebrow">KENAPA AIRWISE?</span>
        <h2>Semua yang Anda butuhkan<br /><em>untuk udara yang lebih baik.</em></h2>
        <p>Informasi udara yang relevan, sederhana, dan dapat ditindaklanjuti.</p>
      </div>
      <div className="feature-grid">
        {contents.map(({ ilustration, title, desc, details }) => (
          <Card
            key={title}
            ilustration={ilustration}
            title={title}
            desc={desc}
            details={details}
          />
        ))}
        <div className="feature-stats">
          <span className="eyebrow">AIRWISE DALAM ANGKA</span>
          <div><strong>20+</strong><small>Kota Dipantau</small></div>
          <div><strong>15K+</strong><small>Pengguna Aktif</small></div>
          <div><strong>99%</strong><small>Akurasi Data</small></div>
          <div><strong>24/7</strong><small>Pemantauan</small></div>
        </div>
      </div>

    </section>
  );
};

export default Features;
