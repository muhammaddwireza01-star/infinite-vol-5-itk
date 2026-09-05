import Card from "./Card";

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
  return (
    <section className="flex justify-between gap-5 px-4 py-20">
      {contents.map(({ ilustration, title, desc }) => (
        <Card ilustration={ilustration} title={title} desc={desc} />
      ))}
    </section>
  );
};

export default Features;
