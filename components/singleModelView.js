import React, { useState } from 'react';
import utilStyles from  '../styles/utils.module.css';


function SingleModelView(model) {
  //console.log('sssss', model, model[0].name);
  return (
    <div className='col2'>
      <img className={utilStyles.modeSingleimg} src={model[0].picture_url} alt={model[0].name} />
      <div className='modelDesc mt0 pt0'>
        <p className='mt0'>Name: <strong> {model[0].name} </strong></p>
        <p>Service Area: <strong> {model[0].service_area} </strong></p>
        <p>Availability Type: <strong> {model[0].location_type} </strong></p>
        <p>Price: <strong> ${model[0].price} </strong></p>
        <p>Gender: <strong> {model[0].gender} </strong></p>
        <p>Ethnicities: <strong>{model[0].ethnicity}</strong></p>
        <p>Height: <strong> {model[0].height} Feet</strong></p>
        <p>Age: <strong> {model[0].age} </strong></p>
        <p>Availability this week: </p>

      </div>
      
    </div>
  );
}

export default SingleModelView;