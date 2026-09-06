// FIX: Removed 'key' from component props
const Card = ({ ilustration, title, desc, details = [] }) => {
  return (
    <div className="landing-card" key={title}>
      <span className="card-icon w-10 h-10">{ilustration}</span>
      <h3 className="text-xl">{title}</h3>
      <p className="text-[14px]">{desc}</p>
      <ul className="card-details">
        {details.map((detail) => (
          <li className="text-[10px]" key={detail}>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
