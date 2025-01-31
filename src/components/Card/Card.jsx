import './styles.css';

const Card = ({ cardStyle, children }) => {
  return (
    <div className="cardWrapper" style={{ backgroundColor: cardStyle }}>
      {children}
    </div>
  );
};

export default Card;
