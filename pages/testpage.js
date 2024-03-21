import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

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

  const router = useRouter();

  useEffect(() => {
    router.replace('/.well-known' + router.asPath);
  }, []);

  return null;
}

export default App;