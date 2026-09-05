import Card from "./Card";

const Solutions = () => {
  const solutions = [
    {
      ilustration: "😹",
      title: "Monitor",
      desc: "AIRWISE pulls real-time data from thousands of air quality sensors globally — PM2.5, PM10, NO₂, O₃, CO, and more.",
    },
    {
      ilustration: "😹",
      title: "Analyze",
      desc: "Our engine correlates pollutant data with weather patterns, traffic density, and seasonal cycles to surface what's driving your local air quality.",
    },
    {
      ilustration: "😹",
      title: "Monitor",
      desc: "Plain-language health guidance, activity recommendations, and personalised alerts so you can act — not just read data.",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-15 px-4 py-20">
      <div className="flex flex-col gap-4 items-center">
        <span className="text-center text-xs text-[#10B1A3]">The Solution</span>
        <h2 className="text-center text text-xl">Meet AIRWISE.</h2>
        <p className="text-gray-700 text-center">
          From raw sensor data to meaningful health decisions — in three steps.
        </p>
      </div>

      <div className="flex flex-wrap justify-between gap-5">
        {solutions.map(({ ilustration, title, desc }) => (
          <Card ilustration={ilustration} title={title} desc={desc} />
        ))}
      </div>
    </section>
  );
};

export default Solutions;
