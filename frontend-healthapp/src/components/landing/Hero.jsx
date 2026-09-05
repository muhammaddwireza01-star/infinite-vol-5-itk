import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div id="home" className="landing-hero">
      <div className="landing-hero-copy">
        <span className="eyebrow">PANTAU UDARA, JAGA KESEHATAN</span>
        <h1>Kenali udara di sekitarmu,<br /><em>jaga kesehatanmu.</em></h1>
        <p>AIRWISE adalah platform cerdas untuk memantau, menganalisis, dan memahami kualitas udara secara real-time di lingkunganmu.</p>
        <div className="landing-actions">
          <Link to="/login" className="primary-action">Mulai Sekarang <FaArrowRight /></Link>
          <a href="#features" className="secondary-action">Lihat Fitur</a>
        </div>
        <div className="hero-proof"><span>● Data real-time</span><span>⌁ Analisis cerdas</span><span>♧ Mudah dipahami</span></div>
      </div>
      <div className="dashboard-preview" aria-label="AIRWISE dashboard preview">
        <div className="preview-sidebar"><strong>◉</strong><span>Dashboard</span><span>Analisis</span><span>Edukasi</span><span>Pengaturan</span></div>
        <div className="preview-main"><div className="preview-top"><b>Halo, Andi 👋</b><small>Senin, 12 Mei 2025</small></div><div className="preview-alert">● Kualitas udara hari ini baik untuk aktivitas luar ruang</div><div className="preview-chart"><div><small>AQI Jakarta</small><strong>126</strong><span>↑ 12% dari kemarin</span></div><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /></div></div><div className="preview-bottom"><div><small>Kualitas udara</small><strong>126</strong><span>Moderate</span></div><div className="preview-line"><small>Tren minggu ini</small><svg viewBox="0 0 120 40" role="img" aria-label="Air quality trend"><polyline points="0,30 20,25 38,29 58,12 76,20 96,8 120,16" /></svg></div></div></div>
      </div>
    </div>
  );
};

export default Hero;
