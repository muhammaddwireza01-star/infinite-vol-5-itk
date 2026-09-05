const Card = ({ ilustration, title, desc }) => {
  return (
    <div className="flex flex-col gap-2 justify-start items-center flex-1 bg-brand-dark p-5  rounded-xl">
      <span text-center>{ilustration}</span>
      <h3 className="text-xl text-center text-gray-900">{title}</h3>
      <p className="text-center text-gray-800">{desc}</p>
    </div>
  );
};

export default Card;
