import React, { useState } from 'react';
import utilStyles from  '../styles/utils.module.css';


function SingleModelView(model) {
  console.log('sssss', model, model[0].name);
  return (
    <div>
      <img className={utilStyles.modelimg} src={model[0].picture_url} alt={model[0].name} />
        <p> Name: {model[0].name}</p>
        <p>Service Area: {model[0].service_area}</p>
        <p>Price: ${model[0].price}</p>
        <p>Sex: {model[0].gender}</p>
        <p>Color: {model[0].color}</p>
        <p>Height: {model[0].height}</p>
        <p>Availability: TBD</p>
      
    </div>
  );
}

export default SingleModelView;