import Card from "./Card";
import AqiReference from "./AqiReference";

const Features = () => {
  const contents = [
    {
      ilustration: "😹",
      title: "Hard to Understand",
      desc: "AQI, PM2.5, NO₂, O₃ — without context, these numbers mean nothing to most people.",
    },
    {
      ilustration: "😹",
      title: "Data Overloadd",
      desc: "Dozens of pollutants, hundreds of stations, and no clear signal about what actually affects your day.",
    },
    {
      ilustration: "😹",
      title: "No Health Bridge",
      desc: 'The gap between "AQI is 85" and "should I go for a run today?" is never answered.',
    },
  ];

  const aqiScales = [
    {
      label: "Good",
      number: "0-50",
      bg: "bg-[#D3F3DF]",
      color: "bg-[#22C55E]",
      textColor: "text-[#22C55E]",
      border: "border-2 border-[#7ADC9E]",
    },
    {
      label: "Moderate",
      number: "51-100",
      bg: "bg-[#FDECCE]",
      color: "bg-[#F59E0B]",
      textColor: "text-[#F59E0B]",
      border: "border-2 border-[#F9C56D]",
    },
    {
      label: "Unhealthy",
      number: "101-150",
      bg: "bg-[#FEE3D0]",
      color: "bg-[#F97316]",
      textColor: "text-[#F97316]",
      border: "border-2 border-[#FBAB73]",
    },
    {
      label: "Hazardous",
      number: "151-200",
      bg: "bg-[#FCDADA]",
      color: "bg-[#EF4444]",
      textColor: "text-[#EF4444]",
      border: "border-2 border-[#F58F8F]",
    },
  ];
  return (
    <section className="flex flex-col items-center gap-15 px-4 py-20">
      <div className="flex flex-col gap-4">
        <span className="text-center text-xs text-[#10B1A3]">The Problem</span>
        <h2 className="text-center text text-xl">
          The Air We Breathe Matters.
        </h2>
        <p className="text-gray-700 text-center">
          Air quality data exists. But raw numbers from sensors don't tell you
          what to do — or why it matters to your health.
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-5">
        {contents.map(({ ilustration, title, desc }) => (
          <Card
            key={title}
            ilustration={ilustration}
            title={title}
            desc={desc}
          />
        ))}
      </div>

      <div className="flex flex-col gap-5 w-full bg-[#CFEFED] p-6 rounded-xl">
        <h4 className="text-center text-xl">AQI Reference Scale</h4>
        <div className="flex justify-between gap-5 flex-wrap">
          {aqiScales.map(({ label, number, bg, color, textColor, border }) => (
            <AqiReference
              key={label}
              label={label}
              number={number}
              bg={bg}
              color={color}
              textColor={textColor}
              border={border}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
