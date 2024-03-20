import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleGalleryItem from './singleGalleryItem';
import utilStyles from  '../styles/utils.module.css';



function GalleryImages({ gs }) {

  
  console.log("gstring", gs);


    const [data, setData] = useState(null); 
    // let galleryString = "asdfd||asdf"; 
    let galleryString = gs; 


    useEffect(() => {
      console.log("gstring in useeffect", galleryString);
      if(galleryString != ""){
        let imgArr = galleryString.split("||");
        setData(imgArr);
      }
      

      }, [galleryString]);

  return (
    <div class="galleryImgs">
      {data && data.map((imgblob, index) => (
        <SingleGalleryItem imgblob={imgblob} key={index} />
      ))}
    </div>
  );
}

export default GalleryImages;



  
