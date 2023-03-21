import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/model/layout';
import withAuth from "../../components/admin/withAuth";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import modelCss from '../../styles/model.module.css';
import moment  from 'moment-timezone';
import uuid from 'react-uuid';
import axios from 'axios';



const Availability = () => {

  const originalUrl = 'https://spagram.com/api/models.php';
  const [baseUrl, setBaseUrl] = useState(originalUrl);
  const [formData, setFormData] = useState({
    modelId: '',
    availability: null,
  });
  const [id, setId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const [availArr, setAvailArr] = useState([{"id": 1, "start": "1676596068", "end": "1676591018"}, {"id": 2, "start": "1676516068", "end": "1676291018"}]);
  const [availArr, setAvailArr] = useState([]);
  const [loading, setLoading] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(null);
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };


  function getCurrentDateGMT() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1;
    const day = now.getUTCDate();
    const hour = now.getUTCHours();
    const minute = now.getUTCMinutes();
    const second = now.getUTCSeconds();
    const milliseconds = now.getUTCMilliseconds();
    const dateGMT = new Date(Date.UTC(year, month, day, hour, minute, second, milliseconds));
    return convertDateStringToTimestamp(dateGMT);
  }

  function convertDateStringToTimestamp(dateString) {
 
    const timezoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Create a moment.js object from the input date string and timezone
    const momentObject = moment.tz(dateString, timezoneString);
    const utcDateString = momentObject.utc().format();
    // const timestamp = Date.parse(dateString) / 1000;
    const timestamp = Date.parse(utcDateString) / 1000;
    return timestamp;
  }

  const saveTSSate = (e) => {
    // setAvailArr({...availArr, {startDate:e.}});
  }


  const getTimefromTS = (ts) => {
    const dateObject = new Date(ts * 1000);

    // Extract the Month, Day, Year, and Time in 12 hour format from the date object
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const time = hours % 12 + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;

    // Combine the extracted values into the desired format
    const formattedDate = month + ' ' + day + ', ' + year + ', ' + time;

    return formattedDate;
  }


  const showdate = () => {
    console.log('so', convertDateStringToTimestamp(startDate));
  };
  const removeTime = (id, e) => {
    setAvailArr(availArr.filter( time =>( time.id !== id ) ))
    setIsUpdate(true);
    setId(121211122);
  };
  const addTime = () =>{
    let id = uuid();
    let start_time = convertDateStringToTimestamp(startDate);
    let end_time = convertDateStringToTimestamp(endDate);
    setAvailArr([...availArr, {"id": id, "start": start_time, "end": end_time}])
  };

  const handleAvaiability = async (e) => {
    if (e !== undefined) e.preventDefault();
    try {
      const modelid = localStorage.getItem("token");
      formData.modelId = modelid;
      formData.availability = JSON.stringify(availArr);
      const response = await axios.post('https://spagram.com/api/update-model-time.php', formData);
      console.log('rest', response.data);
      if(response.data == '1') {
            console.log('updated the time')
            // window.location.href = location.state ? location.state.from.pathname : '/';
      }

  
    } catch (error) {
      console.error(error);
    }
    setIsUpdate(false)
    
  };

  // useEffect(() => {
  //   // call your function here
  //   handleAvaiability();
  // }, [availArr]);

  useEffect(() => {
    const modelid = localStorage.getItem("token");
    setId(modelid);
    let url = "https://spagram.com/api/single-model.php?id=" + id;
    
    const getData = async (id) => {
        try {
          setLoading(true);
          const response = await axios.get(url);
          const result = response.data;
          // setModel({...model, phone: '89999'})
          
          // setModel({availability: result.availability })
            if(result.availability != null){
              console.log('got set');
              setAvailArr(result.availability)
            }
          
          console.log('respons', result)
          
            setLoading(false);
          setError(null);
        } catch (err) {
          setError(err.message);
          // setData(null);
        } finally {
          setLoading(false);
        }
      };

    isUpdate? handleAvaiability() : getData();


  }, [id]);



  return (
    <Layout availability>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <h2> My Availability </h2>
      <div> 
      <ul className={modelCss.availList}> <li className={modelCss.timeList}> Start </li> <li className={modelCss.timeList}>End</li> </ul> {console.log("sd", availArr)}
        {
          availArr && availArr.map( avail => (
            <ul className={modelCss.availList} key={avail.id}> 
              <li className={modelCss.timeList}> {getTimefromTS(avail.start)} </li> 
              <li className={modelCss.timeList}>{getTimefromTS(avail.end)}</li> 
              <li className={modelCss.timeList}> <button onClick={ () => removeTime(avail.id, this)}> Delete </button> </li> 
            </ul> 
          ))
        }
      </div>

      { console.log('hell', startDate) }
      <form onSubmit={handleAvaiability}>
        <div className={modelCss.availBox}>
          <div className='timeBox'> 
              <div>Start Date</div>
              <DatePicker
              showTimeSelect
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeClassName={handleColor}
              dateFormat="MMMM d, yyyy | h:mm aa"
              />  
          </div>

          <div className={modelCss.timeBox2}> 
              <div>End Date</div>
              <DatePicker
              showTimeSelect
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              timeClassName={handleColor}
              dateFormat="MMMM d, yyyy | h:mm aa"
              />  
          </div>
          
          <button type='submit' className={modelCss.save} onClick={addTime}> Add </button>
        
      </div>
    </form>

    </Layout>
  );
}


export default withAuth(Availability);