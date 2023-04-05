import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import DatePicker from 'react-datepicker';
import utilStyles from '../styles/utils.module.css';
import Models from '../components/models';
import "react-datepicker/dist/react-datepicker.css";
import moment  from 'moment-timezone';


export default function Home() {

  const originalUrl = 'https://spagram.com/api/filter-models.php';
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
  
  const [age, setAge] = useState('');
  const [price, setPrice] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [location_type, setLocation_type] = useState('');
  const [area, setArea] = useState('Location');
  const [expandedColumn, setExpandedColumn] = useState(null);
  const [expandedSubColumn, setExpandedSubColumn] = useState(null);

  const options = [
    {
      title: 'New York',
      items: [
        'Albany',
        'Binghamton',
        'Buffalo',
        'Catskills',
        'Chautauqua',
        'Elmira-corning',
        'Finger lakes',
        'Glens falls',
        'Hudson valley',
        'Ithaca',
        'Long island',
        {
          title: 'New York City',
          items: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'New Jersey', 'Long Island', 'Westchester', 'Fairfield'],
        },
        'Oneonta',
        'Plattsburgh-adirondacks',
        'Potsdam-canton-massena',
        'Rochester',
        'Syracuse',
        'Twin tiers NY/PA',
        'Utica-rome-oneida',
        'Watertown',
      ],
    },
    {
      title: 'New Jersey',
      items: ['Central NJ', 'Jersey shore', 'North jersey', 'South jersey', 'NJ suburbs of NYC (subregion of NYC site)'],
    },
    {
      title: 'Connecticut',
      items: ['Eastern CT', 'Hartford', 'New haven', 'Northwest CT', 'Fairfield county (subregion of NYC site)'],
    },
  ];

  const handleClick = (option) => {
    setArea(option);
    setSelectedLocation(false);
  };

  const toggleColumn = (index) => {
    if (expandedColumn === index) {
      setExpandedColumn(null);
    } else {
      setExpandedColumn(index);
    }
  };

  const toggleSubColumn = (index) => {
    if (expandedSubColumn === index) {
      setExpandedSubColumn(null);
    } else {
      setExpandedSubColumn(index);
    }
  };

  const renderMenuItem = (item, index) => {
    if (typeof item === 'string') {
      return (
        <li key={item}>
          <button onClick={() => handleClick(item)}>{item}</button>
        </li>
      );
    } else {
      return (
        <li key={item.title}>
          <button onClick={() => toggleSubColumn(index)}>{item.title}</button>
          {expandedSubColumn === index && (
            <ul className="sub-menu">
              {item.items.map((subItem) => (
                <li key={subItem}>
                  <button onClick={() => handleClick(subItem)}>{subItem}</button>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }
  };


  //area, gender, race, height
  function createFilterUrl(){
    setFilteredUrl(originalUrl + '?service_area=' + area + '&gender=' + gender + '&race=' + race + '&height=' + height);
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
      setFilteredUrl(originalUrl + '?service_area=' + area + '&location_type=' + location_type + '&gender=' + gender + '&ethnicity=' + ethnicity + '&age=' + age + '&price=' + price + '&date=' + mdy  + '&time=' + time);
  }, [area, gender, ethnicity, location_type, age, price, startDate, time]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        Search for massage anywhere in New York, New Jersey, and Connecticut.
      </section>
      
      <section className='filter-container'> 
        <div className={utilStyles.filterLabels}> 
          <div className={utilStyles.filterLabel}> 
            <div className='menu' onClick={ () => setSelectedLocation(!selectedLocation)}> {area} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/></svg> </div>
          <div>
           
      <div className={ selectedLocation? 'mega-menu visible' : ' mega-menu hide' }>
        {options.map((category, index) => (
          <div key={index} className="mega-menu-column">
            <button
              className="mega-menu-title"
              onClick={() => toggleColumn(index)}
            >
              {category.title}
            </button>
            {expandedColumn === index && (
              <ul>
                {category.items.map((item, itemIndex) =>
                  renderMenuItem(item, itemIndex)
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
      </div>
          </div>  
          <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handleLocTypeChange(e)}> 
              <option>Location Type</option> 
              <option>inCall</option> 
              <option>outCall</option>  
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
            <select onChange={(e) => handleEthnicityChange(e)} > 
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
      <section className='viewby'>
          {
          photoOnlyView?    <div className='viewbyicon' title="View Model Photo & details" onClick={()=>setPhotoOnlyView(false)}>  <Image alt='More Info' src="/images/info.png"
          width={30} height={30} />  </div>
          :  
           <div className='viewbyicon' title=" Hide Model description" onClick={()=>setPhotoOnlyView(true)}> <Image alt='More Info' src="/images/info.png"
           width={30} height={30} /> </div> 
          }
      </section>
      <section className='mtop10'>
        <Models photoOnlyView={photoOnlyView} apiUrl={filteredUrl} />
      </section>
    </Layout>
  );
}