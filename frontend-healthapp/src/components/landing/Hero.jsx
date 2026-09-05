import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="hero min-h-[calc(100vh-5rem)]"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-gray-50">
            Know the Air. Protect Your Health.
          </h1>
          <p className="mb-5 text-gray-300">
            AIRWISE helps you understand the air around you through real-time
            insights, visual analysis, and meaningful health information.
          </p>
          <Link to={"/login"} className="btn bg-[#10B1A3] border-none">
            Explore AIRWISE <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
