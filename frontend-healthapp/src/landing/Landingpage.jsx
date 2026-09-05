import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Solutions from "../components/landing/Solutions";
import FinalCta from "../components/landing/FinalCta";
import Footer from "../components/landing/Footer";

const Landingpage = () => {
  return (
    <div className="landing-page">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Solutions />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Landingpage;
