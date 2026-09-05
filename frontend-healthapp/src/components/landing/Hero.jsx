const Hero = () => {
  return (
    <div
      className="hero min-h-[calc(100vh-5rem)]"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}>
      <div className="hero-overlay"></div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          alt="Tailwind CSS hero component"
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold text-gray-50">
            Your Health, Simplified.
          </h1>
          <p className="py-6 text-gray-300">
            Take a smarter approach to your health with simple tools designed to
            help you understand, track, and improve your wellbeing.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
