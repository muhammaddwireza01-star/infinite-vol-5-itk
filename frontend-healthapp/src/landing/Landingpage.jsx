import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Solutions from "../components/landing/Solutions";

const Landingpage = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Solutions />
      </main>
    </div>
  );
};

export default Landingpage;
