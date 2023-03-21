import { useState } from 'react';

function App() {
  const [servPri, setServPri] = useState([
    { id: 1, name: 'Service 1', price: 10 },
    { id: 2, name: 'Service 2', price: 20 },
    { id: 3, name: 'Service 3', price: 30 }
  ]);

  const handleInputChange = (index, property, value) => {
    const values = [...servPri];
    values[index][property] = value;
    setServPri(values);
  };

  const addInput = () => {
    setServPri([...servPri, { id: servPri.length + 1, name: '', price: 0 }]);
  };

  const removeInput = (index) => {
    const values = [...servPri];
    values.splice(index, 1);
    setServPri(values);
  };

  return (
    <div>
      {servPri.map((sp, index) => (
        <div key={sp.id}>
          <input
            value={sp.name}
            onChange={(event) => handleInputChange(index, 'name', event.target.value)}
          />
          <input
            value={sp.price}
            onChange={(event) => handleInputChange(index, 'price', parseFloat(event.target.value))}
          />
          <button onClick={() => removeInput(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addInput}>Add Service Price</button>
    </div>
  );
}

export default App;
