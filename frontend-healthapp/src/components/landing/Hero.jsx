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

          <div className="flex justify-center gap-6 mt-6">
            <div className="flex flex-col gap-1">
              <span className="text-center text-xl text-gray-200">2,400+</span>
              <span className="text-xs text-center text-gray-300">
                Sensor Stations
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-center text-xl text-gray-200">47</span>
              <span className="text-xs text-center text-gray-300">
                Cities Covered
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-center text-xl text-gray-50">99.4%</span>
              <span className="text-xs text-center text-gray-200">
                Data Uptime
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
