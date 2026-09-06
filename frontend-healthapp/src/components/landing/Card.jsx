// FIX: Removed 'key' from component props
const Card = ({ ilustration, title, desc, details = [] }) => {
  return (
    <div className="landing-card" key={title}>
      <span className="card-icon">{ilustration}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
      <ul className="card-details">
        {details.map((detail) => (
          <li key={detail}>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
