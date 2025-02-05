import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card/Card';
import CustomInput from './components/CustomInput/CustomInput';
import CustomSelect from './components/CustomSelect/CustomSelect';
import {
  CARD_TYPES,
  CARD_COLORS,
  typeOptions,
  colorOptions,
} from './constants';
import { getDefaultFields } from './utils';

function CardContent({ card }) {
  return (
    <div key={card.id} className="card">
      <div>ID: {card.id}</div>
      <div>Created at: {card.createdAt}</div>
      {Object.entries(card).map(([key, value]) =>
        key !== 'id' && key !== 'createdAt' && key !== 'color' ? (
          <div key={key} className="cardValuesRow">
            <div>Type: {key.toUpperCase()}</div>
            {Object.entries(value).map(([field, val]) => (
              <div key={field}>
                {field}: {val}
              </div>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
}

function App() {
  const [cards, setCards] = useState([]);
  const [selectedType, setSelectedType] = useState(CARD_TYPES.BUG);
  const [selectedColor, setSelectedColor] = useState(CARD_COLORS.RED);
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    setFormFields(getDefaultFields(selectedType));
  }, [selectedType]);

  const addField = () => {
    setFormFields([...formFields, { name: '', value: '' }]);
  };

  const handleFieldChange = (index, field, newValue) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = newValue;
    setFormFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fieldsToSave =
      formFields.length > 0 ? formFields : getDefaultFields(selectedType);

    const structuredData = fieldsToSave.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});

    const newCard = {
      id: cards.length + 1,
      createdAt: new Date().toLocaleDateString(),
      color: selectedColor,
      [selectedType]: structuredData,
    };

    setCards([...cards, newCard]);
    setFormFields(getDefaultFields(selectedType));
  };

  return (
    <div className="appWrapper">
      <div className="formWrapper">
        <h2>Card settings</h2>
        <form className="formContent" onSubmit={handleSubmit}>
          <div className="selectWrapper">
            <CustomSelect
              label="Card type"
              value={selectedType}
              options={typeOptions}
              onChangeHandler={(e) => setSelectedType(e.target.value)}
            />

            <CustomSelect
              label="Card color"
              value={selectedColor}
              options={colorOptions}
              onChangeHandler={(e) => setSelectedColor(e.target.value)}
              style={{ backgroundColor: selectedColor }}
            />
            <button type="button" className="addBtn" onClick={addField}>
              Add new field
            </button>
          </div>
          {formFields.map((field, index) => (
            <div key={index} className="formInput">
              <CustomInput
                inputLabel={'Label'}
                inputValue={field.name}
                placeholder={'Enter field name'}
                onChangeHandler={(e) =>
                  handleFieldChange(index, 'name', e.target.value)
                }
              />
              <CustomInput
                inputLabel={'Description'}
                inputValue={field.value}
                placeholder={'Enter field value'}
                onChangeHandler={(e) =>
                  handleFieldChange(index, 'value', e.target.value)
                }
              />
            </div>
          ))}
          <button type="submit" className="submitBtn">
            Create card
          </button>
        </form>
      </div>
      <div className="cardsSectionWrapper">
        <h1>Cards</h1>
        <div className="cardsWrapper">
          {cards.map((card) => (
            <Card key={card.id} className="card" cardStyle={card.color}>
              <CardContent card={card} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
