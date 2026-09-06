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
    <section id="features" className="landing-section features-section py-20">
      <div className="flex flex-col gap-4">
        <span className="eyebrow text-xs">KENAPA AIRWISE?</span>
        <h2 className="text-4xl">
          Semua yang Anda butuhkan
          <br />
          <em>untuk udara yang lebih baik.</em>
        </h2>
        <p className="text-sm">
          Informasi udara yang relevan, sederhana, dan dapat ditindaklanjuti.
        </p>
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
          <span className="eyebrow text-xs">AIRWISE DALAM ANGKA</span>
          <div>
            <strong className="text-[1rem]">20+</strong>
            <small className="text-[10px]">Kota Dipantau</small>
          </div>
          <div>
            <strong className="text-[1rem]">15K+</strong>
            <small className="text-[10px]">Pengguna Aktif</small>
          </div>
          <div>
            <strong className="text-[1rem]">99%</strong>
            <small className="text-[10px]">Akurasi Data</small>
          </div>
          <div>
            <strong className="text-[1rem]">24/7</strong>
            <smal className="text-[10px]" l>
              Pemantauan
            </smal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
