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
    <section
      id="solutions"
      className="landing-section solutions-section  py-30">
      <div className="flex flex-col gap-4 items-center">
        <span className="eyebrow text-xs">LEBIH PAHAM, LEBIH SEHAT</span>
        <h2 className="text-4xl">
          Lebih paham,
          <br />
          <em>lebih siap melindungi diri.</em>
        </h2>
        <p className="text-[14px]">
          Pengetahuan yang cukup untuk membuat keputusan sehari-hari yang lebih
          sehat.
        </p>
      </div>

      <div className="education-grid">
        {solutions.map(({ ilustration, title, desc, details }) => (
          <Card
            key={title}
            ilustration={ilustration}
            title={title}
            desc={desc}
            details={details}
          />
        ))}
      </div>
      <div id="about" className="about-airwise py-20">
        <div className="about-visual">
          <span>◒</span>
          <b>24/7</b>
          <small className="text[10px]">memantau udara</small>
        </div>
        <div className="about-copy">
          <span className="eyebrow text-xs">TENTANG AIRWISE</span>
          <h2 className="text-4xl">
            Teknologi untuk
            <br />
            <em>hidup lebih sehat.</em>
          </h2>
          <p className="text-[14px]">
            AIRWISE membantu Anda memahami kualitas udara melalui data
            real-time, analisis visual, dan edukasi kesehatan yang mudah
            dipahami.
          </p>
          <div className="about-points">
            <span className=" text-[10px]">♥ Berorientasi kesehatan</span>
            <span className=" text-[10px]">● Data terpercaya</span>
            <span className=" text-[10px]">▰ Edukasi untuk semua</span>
          </div>
          <a href="#about" className="about-link text-[10px]">
            Kenali AIRWISE lebih dekat →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
