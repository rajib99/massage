import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import DatePicker from 'react-datepicker';
import utilStyles from '../styles/utils.module.css';
import Models from '../components/models';
import "react-datepicker/dist/react-datepicker.css";
import statesAndCities from '../components/data/areas';
import results from '../components/data/areasearch';
import services from '../components/data/services';
import SquareForm from '../components/squareform';



{/* <SquareForm /> */}




export default function Home() {

  const originalUrl = 'https://tsm.spagram.com/api/filter-models.php';
  const [baseUrl, setBaseUrl] = useState(originalUrl);

  // const [area, setArea] = useState('');
  const [gender, setGender] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [height, setHeight] = useState('');
  const [filteredUrl, setFilteredUrl] = useState(originalUrl);
  const [startDate, setStartDate] = useState(null);
  const [time, setTime] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [photoOnlyView, setPhotoOnlyView] = useState(false);
  const [service, setService] = useState('');
  
  
  const [age, setAge] = useState('');
  const [price, setPrice] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [location_type, setLocation_type] = useState('');
  const [area, setArea] = useState('Location');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedStates, setExpandedStates] = useState([]);
  const [expandedCities, setExpandedCities] = useState([]);
  const [expandedBoroughs, setExpandedBoroughs] = useState([]);
  const [showStates, setShowStates] = useState(false);
  // const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState('');

 
  // console.log('servicessss', services);



  const handleResultClick = (result) => {
    setSelectedResult(result);
    setSearchTerm(result);
  }

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
  
  //area, gender, race, height
  function createFilterUrl(){
    let sarea = selectedItems.join(", ");
    setFilteredUrl(originalUrl + '?service_area=' + sarea + '&gender=' + gender + '&race=' + race + '&height=' + height);
    console.log('hi', filteredUrl);
  }

  function handleFilter(){
  // Assuming the input date string is in the format of "YYYY-MM-DDTHH:mm:ss.sssZ"
    const date = new Date(startDate);
    const month = date.toLocaleString('en-US', { month: '2-digit' }); // The getMonth method returns a zero-based month, so we add 1 to get the correct month number.
    // const day = date.getDate();
    const day = date.toLocaleString('en-US', { day: '2-digit' });
    const year = date.getFullYear();
    
    const mdy = month + '/' + day + '/' + year;
    if(year < 2023){
      setFilteredUrl(originalUrl + '?service_area=' + area + '&gender=' + gender + '&race=' + race + '&height=' + height + '&serviceName=' + serviceName);

    }else{
      setFilteredUrl(originalUrl + '?service_area=' + area + '&gender=' + gender + '&race=' + race + '&height=' + height + '&date=' + mdy + '&time=' + time + '&serviceName=' + serviceName);
    }

    console.log('hi', filteredUrl);
  }

  function handleAreaChange(e){
    setArea(e.target.value);
  }
  function handleGenderChange(e){
    setGender(e.target.value);
    // setFilteredUrl(originalUrl + '?service_area=' + area + '&gender=' + gender + '&race=' + race + '&height=' + height + '&serviceName=' + serviceName);
  }
  
  function handleLocTypeChange(e){
    setLocation_type(e.target.value);
  }

  function handleEthnicityChange(e){
    setEthnicity(e.target.value);
  }

  function handleHeightChange(e){
    setHeight(e.target.value)
  }

  function handleRateChange(e){
    setRate(e.target.value)
  }

  function handleAgeChange(e){
    setAge(e.target.value);
  }
  function handlePriceChange(e){
    setPrice(e.target.value);
  }
  function handleServiceChange(e){
    setService(e.target.value);
  }


  function handleTimeChange(e){

  const date = new Date();
  const timezoneOffsetInMinutes = date.getTimezoneOffset();
  const timezoneOffsetInHours = timezoneOffsetInMinutes / 60;
  const timezoneOffsetSign = timezoneOffsetInHours > 0 ? '-' : '+';
  const timezoneOffsetString = `GMT${timezoneOffsetSign}${Math.abs(timezoneOffsetInHours).toString().padStart(2, '0')}:00`;
  
  if(e.target.value != ""){
    let timeGmt =  e.target.value + " " + timezoneOffsetString;
    setTime(timeGmt);
  }else{
    setTime("");
  }
  
  }

  

  useEffect(() => {



    // axios.get('https://tsm.spagram.com/api/area.php')
    //   .then(response => {
    //     setResults(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // initSaveCard();
    let mdy = "";
      if(startDate !== null){
        const timestamp =  Date.parse(startDate);
        const date =  new Date(timestamp);
  
        const month = date.getMonth() + 1; // Months are zero-based in JavaScript
        const day = date.getDate();
        const year = date.getFullYear();

        mdy = `${month}/${day}/${year}`;
        console.log('mdy', mdy);

      }

      let sarea = selectedItems.join(",");
      if( selectedResult !== '' ){
        sarea = selectedResult;
      }else{

      } 
      setFilteredUrl(originalUrl + '?service_area=' + sarea + '&location_type=' + location_type + '&gender=' + gender + '&ethnicity=' + ethnicity + '&age=' + age + '&price=' + price + '&service=' + service + '&date=' + mdy  + '&time=' + time);
  }, [selectedItems, selectedResult, gender, ethnicity, location_type, age, service, price, startDate, time]);

  const filteredResults = results.filter(result => result.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>


      <section className={utilStyles.headingMd}>
        Search for massage anywhere in New York, New Jersey, and Connecticut.
      </section>
      
      <section className='filter-container home-filter-params'> 
        <div className={utilStyles.filterLabels}> 
          <div className={utilStyles.filterLabel}> 
            { /* <div className='menu' onClick={ () => setSelectedLocation(!selectedLocation)}> {area}  </div> */ }
              <div className='loc' onClick={toggleShowStates}>{/*showStates ? 'Hide States' : 'Show States'*/} Location <img className='locarr' src='images/arrow.png' /></div>
          </div>  
          <div className={showStates ? 'mega-menu visible' : 'mega-menu hide'}>
            <div className='close' onClick={toggleShowStates} >X</div>
      {showStates && statesAndCities.map((item) => (
        <div className='menu-cards' key={item.state}>
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
          <div className= { expandedStates.includes(item.state)? 'cities citypadding' : 'cities' }>
          {expandedStates.includes(item.state) &&
            item.cities.map((city) =>
              typeof city === 'string' ? (
                <div key={city} className='menu-cards'>
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
                <div key={city.city} className='menu-cards'>
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
                  <div className= { expandedCities.includes(city.city)? 'cities borough citypadding' : 'cities borough' }>
                  {expandedCities.includes(city.city) &&
                    city.boroughs.map((borough) =>
                      typeof borough === 'string' ? (
                        <div key={borough} className='menu-cards'>
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
                        <div key={borough.borough} className='menu-cards'>
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
                          <div className= { expandedBoroughs.includes(borough.borough)? 'cities neighborhood citypadding' : 'cities neighborhood' }>
                          {expandedBoroughs.includes(borough.borough) &&
                            borough.neighborhoods.map((neighborhood) => (
                              <label key={neighborhood} className='menu-cards'>
                                <input
                                  type="checkbox"
                                  checked={selectedItems.includes(`${neighborhood}`)}
                                  onChange={() => handleNeighborhoodCheckboxChange(item.state, city.city, borough.borough, neighborhood)}
                                />
                                {neighborhood}
                              </label>
                            ))}
                            </div>
                        </div>
                      )
                    )}
                    </div>
                </div>
              )
            )}
            </div>
        </div>
      ))}

    <input type="text" value={searchTerm} placeholder='Enter City/Neigbourhood' onChange={(e) => setSearchTerm(e.target.value.trim())} />
          { searchTerm == ''? '' : 
          <ul className='searchresult'>
            {filteredResults.map((result, index)=> (
              <li key={index} onClick={() => handleResultClick(result)}>
                {result}
              </li>
            ))}
          </ul>
          }
         

    </div>
          <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handleLocTypeChange(e)}> 
              <option>Out/inCall</option> 
              <option>outCall</option> 
              <option>inCall</option>  
            </select>  
          </div>  
          <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handleGenderChange(e)}> 
              <option>Gender</option> 
              <option>Female</option> 
              <option>Male</option> 
              <option>Trans</option> 
            </select>  
            </div>  
          <div className={utilStyles.filterLabel}> 
            <select className={utilStyles.ethnicity} onChange={(e) => handleEthnicityChange(e)} > 
              <option>Ethnicity</option> 
              <option>African</option>
              <option>Arab</option>
              <option>Asian</option>
              <option>Black</option>
              <option>Caucasian (White)</option>
              <option>East Asian</option>
              <option>Hispanic or Latino</option>
              <option>Indigenous</option>
              <option>Indian</option>
              <option>Middle Eastern</option>
              <option>Native American</option>
              <option>Pacific Islander</option>
              <option>South Asian</option>
              <option>Southeast Asian</option>
              <option>Other</option>

            </select>  
          </div> 
          <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handleAgeChange(e)} > 
              <option> Age </option> 
              <option> 18-19 </option> 
              <option> 20-30 </option> 
              <option> 30-40 </option> 
              <option> 40-50 </option> 
              <option> 60+ </option> 
            </select> 
          </div> 
          <div className={utilStyles.filterLabel}> 
            <select className={utilStyles.stype} onChange={(e) => handleServiceChange(e)} > 
              <option> Service Type </option> 
              {
                services.map((service) => (
                  <option> {service.name} </option>

                ))
              }
            </select> 
          </div> 
          <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handlePriceChange(e)} > 
              <option> Rate </option> 
              <option> 100-200 </option> 
              <option> 200-300 </option> 
              <option> 400-500 </option> 
              <option> 500-600 </option> 
              <option> 700-1000 </option> 
            </select> 
          </div> 
          <div className={utilStyles.filterLabel}> 
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                isClearable
                placeholderText="Date"
                />   
           </div>   
          <div className={utilStyles.filterLabel}> 
          <select onChange={(e) => handleTimeChange(e)} > 
              <option value=""> Time </option> 
              <option value="9 am"> 9 am</option> 
              <option value="10 am"> 10 am </option> 
              <option value="11 am"> 11 am  </option> 
              <option value="12 pm"> 12 pm  </option> 
              <option value="1 pm"> 1 pm  </option> 
              <option value="2 pm"> 2 pm  </option> 
              <option value="3 pm"> 3 pm  </option> 
              <option value="4 pm"> 4 pm  </option> 
              <option value="5 pm"> 5 pm  </option> 
              <option value="6 pm"> 6 pm  </option> 
              <option value="7 pm"> 7 pm  </option> 
              <option value="8 pm"> 8 pm  </option> 
              <option value="9 pm"> 9 pm  </option> 
              <option value="10 pm"> 10 pm  </option> 
            </select>  </div>   

            {/* <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handleHeightChange(e)} > 
              <option> Service Name </option> 
              <option> Anything </option> 
              <option> Swedish massage </option> 
              <option> Thai massage  </option> 
              <option> Sports massage  </option> 
              <option> Reflexology  </option> 
              <option> Deep tissue massage </option> 
              <option> Shiatsu massage  </option> 

            </select> 
          </div>  */}

          {/* <div onClick={handleFilter} className='buttont filterbtn'> Filter </div> */}
        </div>
      </section>
      {/* <section className='viewby'>
          {
          photoOnlyView?    <div className='viewbyicon' title="View Model Photo & details" onClick={()=>setPhotoOnlyView(false)}>  <Image alt='More Info' src="/images/info.png"
          width={30} height={30} />  </div>
          :  
           <div className='viewbyicon' title=" Hide Model description" onClick={()=>setPhotoOnlyView(true)}> <Image alt='More Info' src="/images/info.png"
           width={30} height={30} /> </div> 
          }
      </section> */}
      <section className='mtop10 home-filter-cards'>
        <Models photoOnlyView={photoOnlyView} apiUrl={filteredUrl} />
      </section>
    </Layout>
  );
}