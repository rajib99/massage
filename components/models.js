import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Model from './Model';
import utilStyles from  '../styles/utils.module.css';



const modelist = [
    {
      image: '/images/model.jpeg',
      name: 'Jane Doe',
      service_area: 'New York',
      phone: '555-555-5555',
      email: 'jane.doe@example.com',
      availability: 'Available'
    },
    {
      image: '/images/model.jpeg',
      name: 'Johny depp',
      service_area: 'Los Angeles',
      phone: '555-555-5556',
      email: 'john.doe@example.com',
      availability: 'Unavailable'
    },
    {
      image: '/images/model.jpeg',
      name: 'Jane Smith',
      service_area: 'San Francisco',
      phone: '555-555-5557',
      email: 'jane.smith@example.com',
      availability: 'Available'
    },
    {
        image: '/images/model.jpeg',
        name: 'Jane Doe',
        service_area: 'New York',
        phone: '555-555-5555',
        email: 'jane.doe@example.com',
        availability: 'Available'
      },
      {
        image: '/images/model.jpeg',
        name: 'Johny depp',
        service_area: 'Los Angeles',
        phone: '555-555-5556',
        email: 'john.doe@example.com',
        availability: 'Unavailable'
      },
      {
        image: '/images/model.jpeg',
        name: 'Jane Smith',
        service_area: 'San Francisco',
        phone: '555-555-5557',
        email: 'jane.smith@example.com',
        availability: 'Available'
      }
  ];

function Models({ photoOnlyView, apiUrl }) {

   // const base_endpoint = 'https://spagram.com/api/models.php';
    //const [api_enpoint, setApi_enpoint] = useState(base_endpoint);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log('ses',apiUrl);
    

    useEffect(() => {
      // console.log('show mm', photoOnlyView);

      setLoading(true);
        const getData = async () => {
            try {
              const response = await axios.get(apiUrl);
              setData(response.data);
              console.log('alldata', response.data)
              setError(null);
            } catch (err) {
              setError(err.message);
              setData(null);
            } finally {
              setLoading(false);
            }
          };
        getData();
      }, [apiUrl]);

  return (
    <div className={utilStyles.models}>
        

        {loading && <div>Loading...</div>}
        {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && data.map((model, index) => (
        <Model photoOnlyView={photoOnlyView} key={index} {...model} />
      ))}
      { data && !loading && data.length < 1 ? " No Model matched your searched criteria.  " : ""}
    </div>
  );
}

export default Models;



  
