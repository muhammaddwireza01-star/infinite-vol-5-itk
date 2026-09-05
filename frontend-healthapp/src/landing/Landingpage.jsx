import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";

const Landingpage = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
};

export default Landingpage;
