import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/admin/layout';
import utilStyles from '../../styles/utils.module.css';
import Models from '../../components/models';
import withAuth from "../../components/admin/withAuth";



const Home = () => {

  // const originalUrl = 'https://tsm.spagram.com/api/models.php';
  const originalUrl = 'https://tsm.spagram.com/api/models.php';
  const [baseUrl, setBaseUrl] = useState(originalUrl);

  const [area, setArea] = useState('');
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [height, setHeight] = useState('');
  const [filteredUrl, setFilteredUrl] = useState(originalUrl);

  //area, gender, race, height
  function createFilterUrl(){
    setFilteredUrl(originalUrl + '?service_area=' + area + '&gender=' + gender + '&race=' + race + '&height=' + height);
    console.log('hi', filteredUrl);
  }

  function handleFilter(){
    setFilteredUrl(originalUrl + '?service_area=' + area + '&gender=' + gender + '&race=' + race + '&height=' + height);
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
              <option value=""> Area </option> 
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
          <div className={utilStyles.filterLabel}> Date/Time </div>   
          <div onClick={handleFilter} className='button'> Filter </div>
        </div>
      </section>
      <section>
        <Models apiUrl={filteredUrl} />
      </section>
    </Layout>
  );
}


export default withAuth(Home);