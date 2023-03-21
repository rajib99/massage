import React, { useState, useEffect } from 'react';
import utilStyles from  '../styles/utils.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';




//
function Model({ photoOnlyView, id, picture_url, name, service_area, gender, color, height, availability }) {

    const router = useRouter();
    const [isActive, setActive] = useState(true);

    function toggleinfo(isActive){
        isActive? setActive(photoOnlyView) : setActive(photoOnlyView);
    }
    const handleClick = () => {
        router.push({
          pathname: '/booking',
          query: { singleApiUrl: 'https://spagram.com/api/models.php?id=' + id },
        });
      };
    

      useEffect(() => {
        const hell = () => {
          console.log('show', photoOnlyView);
        }
        
        hell();
        
        }, [isActive]);
  return (
    <div onClick={()=>toggleinfo(isActive)} className={utilStyles.model}>
      <img className={utilStyles.modelimg} src={picture_url} alt={name} />
      <div  className={photoOnlyView? 'hide': 'show'}>
        <h2>{name}</h2>
        <p>Service Area: {service_area}</p>
        <p>Sex: {gender}</p>
        <p>Color: {color}</p>
        <p>Height: {height}</p>
        <p>Availability: TBD</p>
        <p><button className='button' onClick={handleClick}> Select </button></p>
      </div>
      
    </div>
  );
}

export default Model;