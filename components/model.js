import React, { useState, useEffect } from 'react';
import utilStyles from  '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';




//
function Model({ photoOnlyView, date, time, id, picture_url, name, service_area_primary, service_area, price, services_prices, gender, color, height, availability }) {

    const router = useRouter();
    const [isActive, setActive] = useState(true);

    function toggleinfo(isActive){
        isActive? setActive(photoOnlyView) : setActive(photoOnlyView);
    }
    const handleClick = () => {
        router.push({
          pathname: '/booking',
          query: { singleApiUrl: 'https://spagram.com/api/models.php?id=' + id + '&date=' + date + '&time=' + time},
        });
      };
    

      useEffect(() => {
        const hell = () => {
          console.log('show', photoOnlyView);
        }
        
        hell();
        
        }, [isActive]);
  return (
    <div onClick={handleClick} className={utilStyles.model}>
    {/* <div onClick={()=>toggleinfo(isActive)} className={utilStyles.model}> */}
      <div className={utilStyles.modelimgCnt}><img className={utilStyles.modelimg} src={picture_url} alt={name} />  </div> 
      <div  className={photoOnlyView? 'hide': 'show'}>
        <h2 className={utilStyles.modelName}>{name}</h2>
        <div className={utilStyles.location}> <Image
                priority
                src="/images/location.png"
                className={utilStyles.borderCircle}
                height={20}
                width={20}
                alt=""
              /> 
     {/* <span> {service_area.replace(/,/g, ', ')} </span> */}
     <span> {service_area_primary} </span>
    </div>
        {/* <p>{services_prices}</p> */}

      </div>
      
    </div>
  );
}

export default Model;