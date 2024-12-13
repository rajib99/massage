//instructions:
// replace the CopyCrudTble with your menu name 
// and copyCrud with your context name. case sensitive
// replace data fields according to table cells 
// update get and post urls and update those php files
// change the withauth to releveant component
// change layout

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/model/layout';
import modelStyle from '../../styles/model.module.css';
import withAuth from "../../components/admin/withAuth";
import axios from 'axios';
import CopyCrudSingle from "./copyCrudSingle.js";


const CopyCrudTble = () => {

  const [copyCrudData, setCopyCrudData] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noCopyCrud, setNoCopyCrud] = useState(false);
  const [status, setStatus] = useState(false);

  // const rowclass = `${modelStyle.row} ${modelStyle.header}`;

  //area, gender, race, height

  const changeCopyCrudStatus = (status) => {
    if(status == "Approved"){
      setStatus("Approved");
      console.log('stats', status);
    }else{
      setStatus("Denied");
      console.log('stats d', status);
    }
  }

  useEffect(() => {

    const modelid = localStorage.getItem("token");
    setLoading(true);
    const queryUrl = 'https://tsm.spagram.com/api/getpendingorders.php?modelid=' + modelid;
    const getData = async () => {
        try {
          const response = await axios.get(queryUrl);
          console.log(' api response', response.data );
          setCopyCrudData(response.data);
          response.data.length < 1 ? setNoCopyCrud(true) : '';
          setLoading(true);

        } catch (err) {
          console.log(err)
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      // let modid = singleApiUrl.split("=")[1];

        getData();
  //       const availabilityUrl = 'https://tsm.spagram.com/api/availability.php?id=' + singleApiUrl.split("=")[1] + 'date=' + isDateSelected + 'time=' + isTimeSelected;
 
  }, [status]);

  // if (!copyCrudData || copyCrudData.length === 0) {
  //   return <div>Loading...</div>; // You can display a loading state while data is being fetched
  // }

  return (
    <Layout copyCruds>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <div className='copyCrudlist'>
      <h2> Your Service Request </h2>
      <div className='copyCruds'> 

      <div className={modelStyle.table}>
      <table className='table'>
        <thead>
          <tr>
            <th> Request Time </th>
            <th> Address </th>
            <th> Call Type </th>
            <th> Service Time </th>
            <th> Status </th>

          </tr>
        </thead>
      <tbody> 

       {copyCrudData && copyCrudData.map((copyCrud, index) => (
        // <CopyCrudSingle key={index} {...copyCrud} changeCopyCrudStatus={changeCopyCrudStatus} />
        // <CopyCrudSingle changeCopyCrudStatus={changeCopyCrudStatus} key={index} copyCrud={copyCrud} />
        <CopyCrudSingle key={index} changeCopyCrudStatus={changeCopyCrudStatus}  copyCrud ={copyCrud}  />
      ))}
      </tbody>
      </table>
    </div>
    <strong> {noCopyCrud? "You don't have any pending service request" : ''} </strong> 
     
      
      </div>
      
      </div>
      
      
    </Layout>
  );
}


export default withAuth(CopyCrudTble);