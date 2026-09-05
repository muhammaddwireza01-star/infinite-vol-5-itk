import Card from "./Card";

const Solutions = () => {
  const solutions = [
    {
      ilustration: "◉",
      title: "Mengenal AQI",
      desc: "Pahami arti angka dan warna pada indeks kualitas udara.",
      details: ["Baca selengkapnya →"],
    },
    {
      ilustration: "⌁",
      title: "Dampak bagi tubuh",
      desc: "Kenali pengaruh polusi udara pada paru-paru dan kesehatan.",
      details: ["Baca selengkapnya →"],
    },
    {
      ilustration: "♥",
      title: "Cara melindungi diri",
      desc: "Temukan langkah sederhana agar tetap aman saat udara buruk.",
      details: ["Baca selengkapnya →"],
    },
    {
      ilustration: "⌁",
      title: "Mengenal PM2.5",
      desc: "Kenali partikel halus yang dapat masuk jauh ke dalam sistem pernapasan.",
      details: ["Baca selengkapnya →"],
    },
    {
      ilustration: "●",
      title: "Kapan pakai masker?",
      desc: "Ketahui kapan perlindungan tambahan dibutuhkan saat beraktivitas.",
      details: ["Baca selengkapnya →"],
    },
  ];

  return (
    <>
      <section id="solutions" className="landing-section solutions-section">
        <div className="flex flex-col gap-4 items-center">
          <span className="eyebrow">LEBIH PAHAM, LEBIH SEHAT</span>
          <h2>Lebih paham,<br /><em>lebih siap melindungi diri.</em></h2>
          <p>Pengetahuan yang cukup untuk membuat keputusan sehari-hari yang lebih sehat.</p>
        </div>

        <div className="education-grid">
          {solutions.map(({ ilustration, title, desc, details }) => (
            <Card key={title} ilustration={ilustration} title={title} desc={desc} details={details} />
          ))}
        </div>
      </section>

      <section id="about" className="landing-section solutions-section" style={{ marginTop: "64px" }}>
        <div className="about-airwise">
          <div className="about-visual"><span>◒</span><b>24/7</b><small>memantau udara</small></div>
          <div className="about-copy">
            <span className="eyebrow">TENTANG AIRWISE</span>
            <h2>Teknologi untuk<br /><em>hidup lebih sehat.</em></h2>
            <p>AIRWISE membantu Anda memahami kualitas udara melalui data real-time, analisis visual, dan edukasi kesehatan yang mudah dipahami.</p>
            <div className="about-points"><span>⊕ Berorientasi kesehatan</span><span>● Data terpercaya</span><span>◖ Edukasi untuk semua</span></div>
            <a href="#about" className="about-link">Kenali AIRWISE lebih dekat ↗</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Solutions;
