import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/model/layoutCustomer';
import utilStyles from '../../styles/utils.module.css';
import Models from '../../components/models';
import withAuth from "../../components/admin/withAuthCustomer";
import Link from 'next/link';



const Home = () => {

  const originalUrl = 'https://spagram.com/api/models.php';
  const [baseUrl, setBaseUrl] = useState(originalUrl);

  const [area, setArea] = useState('');
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [height, setHeight] = useState('');
  const [filteredUrl, setFilteredUrl] = useState(originalUrl);

//   //area, gender, race, height
//   function createFilterUrl(){
//     setFilteredUrl(originalUrl + '?service_area=' + area + '&gender=' + gender + '&race=' + race + '&height=' + height);
//     console.log('hi', filteredUrl);
//   }


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <h2> Customer Dashboard </h2>
      <h2> Order status </h2>
      <h2> <Link href='customer-backend/profile'> Profile Info </Link> </h2>
      <div className='oders'>
        <div className='orderitem'>
            <div> Oder id </div>
            <div> Model name </div>
            <div> Date/time </div>
            <div> Address </div>
        </div>
      </div>
      
    </Layout>
  );
}


export default withAuth(Home);