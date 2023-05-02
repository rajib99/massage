import React, { useState } from 'react';

const statesAndCities = [
  {
    state: 'New York',
    cities: [
      {
        city: 'New York City',
        boroughs: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
      },
      'Buffalo',
      'Rochester',
      'Albany',
    ],
  },
  {
    state: 'California',
    cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
  },
  {
    state: 'Texas',
    cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
  },
];

const StateCityCheckbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedStates, setExpandedStates] = useState([]);
  const [expandedCities, setExpandedCities] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleState = (state) => {
    if (expandedStates.includes(state)) {
      setExpandedStates(expandedStates.filter((s) => s !== state));
    } else {
      setExpandedStates([...expandedStates, state]);
    }
  };

  const toggleCity = (city) => {
    if (expandedCities.includes(city)) {
      setExpandedCities(expandedCities.filter((c) => c !== city));
    } else {
      setExpandedCities([...expandedCities, city]);
    }
  };

  const handleStateCheckboxChange = (state) => {
    if (selectedItems.includes(state)) {
      setSelectedItems(selectedItems.filter((item) => item !== state));
    } else {
      setSelectedItems([...selectedItems, state]);
    }
  };

  const handleCityCheckboxChange = (state, city) => {
    const newItem = `${state} - ${city}`;
    if (selectedItems.includes(newItem)) {
      setSelectedItems(selectedItems.filter((item) => item !== newItem));
    } else {
      setSelectedItems([...selectedItems, newItem]);
    }
  };

  const handleBoroughCheckboxChange = (state, city, borough) => {
    const newItem = `${state} - ${city} - ${borough}`;
    if (selectedItems.includes(newItem)) {
      setSelectedItems(selectedItems.filter((item) => item !== newItem));
    } else {
      setSelectedItems([...selectedItems, newItem]);
    }
  };

  return (
    <div>
      <h1>React Multi-Selectable Dropdown with Checkboxes</h1>
      <button onClick={toggleDropdown}>
        {isOpen ? 'Close Dropdown' : 'Open Dropdown'}
      </button>
      {isOpen && (
        <div>
          {statesAndCities.map((item) => (
            <div key={item.state}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.state)}
                  onChange={() => handleStateCheckboxChange(item.state)}
                />
                <h3>{item.state}</h3>
              </label>
              <button onClick={() => toggleState(item.state)}>
                {expandedStates.includes(item.state) ? '-' : '+'}
              </button>
              {expandedStates.includes(item.state) &&
                item.cities.map((city) =>
                  typeof city === 'string' ? (
                    <div key={city}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(`${item.state} - ${city}`)}
                          onChange={() => handleCityCheckboxChange(item.state, city)}
                       
                          />
                          {city}
                        </label>
                      </div>
                    ) : (
                      <div key={city.city}>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(`${item.state} - ${city.city}`)}
                            onChange={() => handleCityCheckboxChange(item.state, city.city)}
                          />
                          {city.city}
                        </label>
                        <button onClick={() => toggleCity(city.city)}>
                          {expandedCities.includes(city.city) ? '-' : '+'}
                        </button>
                        {expandedCities.includes(city.city) &&
                          city.boroughs.map((borough) => (
                            <label key={borough}>
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(`${item.state} - ${city.city} - ${borough}`)}
                                onChange={() => handleBoroughCheckboxChange(item.state, city.city, borough)}
                              />
                              {borough}
                            </label>
                          ))}
                      </div>
                    )
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default StateCityCheckbox;
  