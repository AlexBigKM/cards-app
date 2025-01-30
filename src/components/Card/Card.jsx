import './styles.css';

const Card = ({ cardStyle, onDragStartHandler, children }) => {
  return (
    <div
      className="cardWrapper"
      style={{ backgroundColor: cardStyle }}
      draggable
      onDragStart={onDragStartHandler}
    >
      {children}
    </div>
  );
};

export default Card;
