import { useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import data from '../data.json';

function CardContent({ card }) {
  return Object.entries(card).map(([key, value]) => (
    <div key={key} className="cardValuesRow">
      <strong>{key}:</strong>{' '}
      {typeof value === 'object' ? JSON.stringify(value) : value}
    </div>
  ));
}

function App() {
  const [cardsArr, setCardsArr] = useState([]);
  const { cards } = data;

  const onDragHandler = (e, card) => {
    e.dataTransfer.setData('card', JSON.stringify(card));
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const onDropHandler = (e) => {
    const cardData = JSON.parse(e.dataTransfer.getData('card'));
    setCardsArr([...cardsArr, cardData]);
  };

  return (
    <div className="appWrapper">
      <div className="cardsSection">
        {cards.map((card, index) => (
          <Card
            key={index}
            cardStyle={card.color || '#fff'}
            onDragStartHandler={(e) => onDragHandler(e, card)}
          >
            <CardContent card={card} />
          </Card>
        ))}
      </div>
      <div
        className="cardsTable"
        onDrop={onDropHandler}
        onDragOver={dragOverHandler}
      >
        Drop Area
        {cardsArr.map((item, index) => {
          console.log('Rendering inProgress cards:', item);
          return (
            <Card key={index} cardStyle={item.color || '#fff'}>
              <CardContent card={item} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
