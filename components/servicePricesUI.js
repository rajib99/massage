import React, { useState } from 'react';
import utilStyles from  '../styles/utils.module.css';




//
function ServicePricesUI({spArr}) {
  return (
    <div className={utilStyles.servicePrices}>
      <div>
        { console.log('sparr2', spArr) }
            {/* <ul><li> {  spArr.split(":")[0] }</li> <li> $<input type="text" value={ spArr.split(":")[1]  }></input> </li> </ul> */}
           
      </div>
      
    </div>
  );
}

export default ServicePricesUI;