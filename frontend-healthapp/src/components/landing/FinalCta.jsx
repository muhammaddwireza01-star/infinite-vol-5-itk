import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const FinalCta = () => {
  return (
    <section id="cta" className="final-cta">
      <div className="flex flex-col gap-4">
        <span className="eyebrow">MULAI HARI INI</span>
        <h1>
          <span>Udara sehat dimulai</span>
          <span><em>dari informasi yang tepat.</em></span>
        </h1>
        <p>Gabung bersama AIRWISE dan buat keputusan yang lebih baik untuk kesehatan Anda.</p>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <Link to="/login" className="primary-action">
          Coba AIRWISE Sekarang <FaArrowRight />
        </Link>
        <span>Gratis untuk memulai · Tanpa kartu kredit</span>
      </div>
    </section>
  );
};

export default FinalCta;
