import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import DatePicker from 'react-datepicker';
import utilStyles from '../styles/utils.module.css';
import Models from '../components/models';
import "react-datepicker/dist/react-datepicker.css";
import moment  from 'moment-timezone';


export default function Home() {

  const originalUrl = 'https://spagram.com/api/models.php';
  const [baseUrl, setBaseUrl] = useState(originalUrl);

  const [area, setArea] = useState('');
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [height, setHeight] = useState('');
  const [filteredUrl, setFilteredUrl] = useState(originalUrl);
  const [startDate, setStartDate] = useState(null);
  const [time, setTime] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [photoOnlyView, setPhotoOnlyView] = useState(false);


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
  }

  function handleRaceChange(e){
    setRace(e.target.value);
  }

  function handleHeightChange(e){
    setHeight(e.target.value)
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

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        Filter down a model and sechedule a massage with him/her.
      </section>
      <section className='filter-container'> 
        <div className={utilStyles.filterLabels}> <div>Filters:</div> 
          <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handleAreaChange(e)}> 
              <option value=""> Location </option> 
              <option> Manhattan </option> 
              <option> Brooklyn </option> 
              <option> Queens </option> 
              <option> Bronx </option> 
              <option> Staten Island </option> 
            </select> 
          </div>  
          <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handleGenderChange(e)}> 
              <option> Gender </option> 
              <option> Female </option> 
              <option> Male </option> 
              </select>  
            </div>  
          <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handleRaceChange(e)} > 
              <option> Race </option> 
              <option> White </option> 
              <option> Black </option> 
            </select>  
          </div> 
          <div className={utilStyles.filterLabel}> 
            <select onChange={(e) => handleHeightChange(e)} > 
              <option> Height </option> 
              <option> over 6 feet </option> 
              <option> over 5 feet  </option> 
              <option> over 4 feet  </option> 
            </select> 
          </div> 
          <div className={utilStyles.filterLabel}> 
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy"
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

          <div onClick={handleFilter} className='button'> Filter </div>
        </div>
      </section>
      <section className='viewby'>
          {
          photoOnlyView?    <div className='button' onClick={()=>setPhotoOnlyView(false)}> View Photo & details </div>
          :  
           <div className='button' onClick={()=>setPhotoOnlyView(true)}> View by Photo </div> 
          }
      </section>
      <section>
        <Models photoOnlyView={photoOnlyView} apiUrl={filteredUrl} />
      </section>
    </Layout>
  );
}