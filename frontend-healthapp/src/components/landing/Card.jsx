// FIX: Removed 'key' from component props
const Card = ({ ilustration, title, desc }) => {
  return (
    <div className="flex flex-col gap-2 justify-start items-center flex-1 bg-[#9FE0DA] p-5  rounded-xl">
      {/* FIX: Changed text-center to className="text-center" */}
      <span className="text-center">{ilustration}</span>
      <h3 className="text-xl text-center text-gray-900">{title}</h3>
      <p className="text-center text-gray-800">{desc}</p>
    </div>
  );
};

export default Card;
