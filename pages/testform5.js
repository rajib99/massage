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
    const newItem = `${state} - ${city} - ${borough} - ${neighborhood}`;
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
      <button onClick={toggleShowStates}>
        {showStates ? "Hide States" : "Show States"}
      </button>
      {showStates &&
        statesAndCities.map((item) => (
          <div key={item.state}>
            <button onClick={() => toggleState(item.state)}>
              {expandedStates.includes(item.state) ? "-" : "+"}
            </button>
            <label>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.state)}
                onChange={() => handleStateCheckboxChange(item.state)}
              />
              {item.state}
            </label>
            {expandedStates.includes(item.state) &&
              item.cities.map((city) => (
                <div key={city.name}>
                  <button onClick={() => toggleCity(item.state, city.name)}>
                    {expandedCities.includes(`${item.state}_${city.name}`) ? "-" : "+"}
                  </button>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(city.name)}
                      onChange={() => handleCityCheckboxChange(city.name)}
                    />
                    {city.name}
                  </label>
                  {expandedCities.includes(`${item.state}_${city.name}`) &&
                    city.boroughs.map((borough) => (
                      <div key={borough.name}>
                        <button onClick={() => toggleBorough(item.state, city.name, borough.name)}>
                          {expandedBoroughs.includes(`${item.state}_${city.name}_${borough.name}`) ? "-" : "+"}
                        </button>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(borough.name)}
                            onChange={() => handleBoroughCheckboxChange(borough.name)}
                          />
                          {borough.name}
                        </label>
                        {expandedBoroughs.includes(`${item.state}_${city.name}_${borough.name}`) &&
                          borough.neighborhoods.map((neighborhood) => (
                            <label key={neighborhood}>
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(neighborhood)}
                                onChange={() => handleNeighborhoodCheckboxChange(neighborhood)}
                              />
                              {neighborhood}
                            </label>
                          ))}
                      </div>
                    ))}
                </div>
              ))}
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

  