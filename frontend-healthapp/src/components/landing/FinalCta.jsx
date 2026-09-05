import { Link } from "react-router-dom";

const FinalCta = () => {
  return (
    <section className="flex flex-col gap-10 py-20">
      <div className="flex flex-col gap-4">
        <span className="text-center text-xs text-[#10B1A3]">Start Now</span>
        <h1 className="flex flex-col items-center text-center text text-xl">
          <span>Ready to Understand</span>
          <span>Your Air?</span>
        </h1>
        <p className="text-gray-700 text-center">
          Join thousands of people who make smarter daily decisions with
          AIRWISE. Free to start — no credit card required.
        </p>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <Link
          to={"/login"}
          className="btn px-10 py-6 bg-[#10B1A3] border-none min-w-20">
          Get Started
        </Link>
        <span>No credit card · Cancel anytime · Free forever plan</span>
      </div>
    </section>
  );
};

export default FinalCta;
