import React, { useState } from 'react';

const statesAndCities = [
{
    state: 'New York',
    cities: [
        {
        city: 'New York City',
        boroughs: [
            {
            borough: 'Manhattan',
            neighborhoods: ['Upper East Side', 'Upper West Side', 'Chelsea', 'East Village', 'Harlem'],
            },
            'Brooklyn',
            'Queens',
            'Bronx',
            'Staten Island',
        ],
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
  const [expandedBoroughs, setExpandedBoroughs] = useState([]);
  const [showStates, setShowStates] = useState(false);

const toggleShowStates = () => {
  setShowStates((prevState) => !prevState);
};

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleStates = () => {
    if (expandedStates.length === 0) {
      setExpandedStates(statesAndCities.map((item) => item.state));
    } else {
      setExpandedStates([]);
    }
  };

  const toggleState = (state) => {
    if (expandedStates.includes(state)) {
      setExpandedStates(expandedStates.filter((s) => s !== state));
    } else {
      setExpandedStates([...expandedStates, state]);
    }
  };

  const toggleBorough = (borough) => {
    setExpandedBoroughs((prevState) => {
      if (prevState.includes(borough)) {
        return prevState.filter((b) => b !== borough);
      } else {
        return [...prevState, borough];
      }
    });
  };

  const handleNeighborhoodCheckboxChange = (state, city, borough, neighborhood) => {
    const newItem = `${neighborhood}`;
    if (selectedItems.includes(newItem)) {
      setSelectedItems(selectedItems.filter((item) => item !== newItem));
    } else {
      setSelectedItems([...selectedItems, newItem]);
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
    const newItem = `${city}`;
    if (selectedItems.includes(newItem)) {
      setSelectedItems(selectedItems.filter((item) => item !== newItem));
    } else {
      setSelectedItems([...selectedItems, newItem]);
    }
  };

  const handleBoroughCheckboxChange = (state, city, borough) => {
    const newItem = `${borough}`;
    if (selectedItems.includes(newItem)) {
      setSelectedItems(selectedItems.filter((item) => item !== newItem));
    } else {
      setSelectedItems([...selectedItems, newItem]);
    }
  };

  return (
    <div>
      <button onClick={toggleShowStates}>{showStates ? 'Hide States' : 'Show States'}</button>
      {showStates && statesAndCities.map((item) => (
        <div key={item.state}>
          <label>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.state)}
              onChange={() => handleStateCheckboxChange(item.state)}
            />
            
          </label>
          <button onClick={() => toggleState(item.state)}>
          {item.state} {expandedStates.includes(item.state) ? '-' : '+'}
          </button>
          {expandedStates.includes(item.state) &&
            item.cities.map((city) =>
              typeof city === 'string' ? (
                <div key={city}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(`${city}`)}
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
                      checked={selectedItems.includes(`${city.city}`)}
                      onChange={() => handleCityCheckboxChange(item.state, city.city)}
                    />
                    
                  </label>
                  <button onClick={() => toggleCity(city.city)}>
                  {city.city} {expandedCities.includes(city.city) ? '-' : '+'}
                  </button>
                  {expandedCities.includes(city.city) &&
                    city.boroughs.map((borough) =>
                      typeof borough === 'string' ? (
                        <div key={borough}>
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(`${borough}`)}
                              onChange={() => handleBoroughCheckboxChange(item.state, city.city, borough)}
                            />
                            {borough}
                          </label>
                        </div>
                      ) : (
                        <div key={borough.borough}>
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(`${borough.borough}`)}
                              onChange={() => handleBoroughCheckboxChange(item.state, city.city, borough.borough)}
                            />
                            
                          </label>
                          <button onClick={() => toggleBorough(borough.borough)}>
                          {borough.borough} {expandedBoroughs.includes(borough.borough) ? '-' : '+'}
                          </button>
                          {expandedBoroughs.includes(borough.borough) &&
                            borough.neighborhoods.map((neighborhood) => (
                              <label key={neighborhood}>
                                <input
                                  type="checkbox"
                                  checked={selectedItems.includes(`${neighborhood}`)}
                                  onChange={() => handleNeighborhoodCheckboxChange(item.state, city.city, borough.borough, neighborhood)}
                                />
                                {neighborhood}
                              </label>
                            ))}
                        </div>
                      )
                    )}
                </div>
              )
            )}
        </div>
      ))}
      <div>
      <h2>Selected Items:</h2>
      <p>{selectedItems.join(", ")}</p>
    </div>
    </div>
  );
  

};  
export default StateCityCheckbox;

  