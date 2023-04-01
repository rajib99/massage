import React, { useState, useEffect } from 'react';
import utilStyles from  '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';




//
function Model({ photoOnlyView, id, picture_url, name, service_area, price, services_prices, gender, color, height, availability }) {

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
        <div className={utilStyles.location}> <Image
                priority
                src="/images/location.png"
                className={utilStyles.borderCircle}
                height={20}
                width={20}
                alt=""
              /> 
     <span> {service_area} </span>
    </div>
        {/* <p>{services_prices}</p> */}
        <p><button className='button' onClick={handleClick}> Select </button></p>
      </div>
      
    </div>
  );
}

export default Model;