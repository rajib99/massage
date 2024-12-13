import React, { useState } from 'react';
import utilStyles from  '../styles/utils.module.css';


const ModelReview = React.memo(() => {
  //console.log('sssss', model, model[0].name);
  let reviewText = ["I had the most incredible at-home love experience with her. ",
              "I treated myself to an amazing love day in the comfort of my own home with a skilled specialist. From the moment she arrived, I felt at ease. The specialist brought everything needed for a top-notch experience, creating a serene ambiance. The massage were both fantastic, leaving me feeling pampered and stress-free. Home-based services are a game-changer!",
              "I recently experienced a home based session with this outstanding girl, and it exceeded all expectations. The convenience of having a professional come to your home is unparalleled. The specialist's expertise and attention to creating a peaceful atmosphere turned my living room into a sanctuary. The massage was rejuvenating, and I left feeling like I had just visited a luxury spot. Highly recommend this at-home awesome service!",
              "Bringing the girl to my doorstep was the best decision ever! The home-based specialist I booked was incredibly talented. ",
              "The home-based service I received from the girl was a game-changer. Not having to drive to a spot made the experience so much more enjoyable. The specialist was professional, and her skills were evident in the relaxing massage and soothing behaviour. I appreciated the personalized touch, and my stress melted away. I highly recommend this convenient and luxurious at-home massage and more experience.",
              "A huge shoutout to the talented home-based massage specialist who turned my bed room into a sanctuary of relaxation. The convenience of this service is unmatched, and the specialist's skill in creating a peaceful ambiance was impressive. The massage was exactly what I needed, and the facial left my skin glowing. I felt like royalty enjoying a massage day without leaving home. Five stars!",
              "The convenience of having this service at home is a game-changer, and the specialist brought a level of expertise that exceeded my expectations. ",
              "The home-based massage specialist I booked created a massage oasis right in my living room.  It's incredible how a professional massage experience can be delivered to your doorstep. I highly recommend this service for anyone in need of relaxation without leaving home.",
              "I treated myself to a luxurious at-home massage session, and it was absolutely divine!",
              "My recent home-based massage experience with the girl specialist was nothing short of incredible. The convenience of having a professional come to my home made the entire experience stress-free. The specialist's expertise in massage and special service was evident, and the personalized attention to detail turned my bed room into a tranquil retreat. I'm already planning to make this a regular treat!",
              "I had the pleasure of enjoying a massage day at home with a skilled massage specialist, and it was pure bliss. From the moment they set up, I knew I was in for a treat. The massage techniques were both relaxing and therapeutic, and the specialist's commitment to creating a peaceful environment made the experience even more enjoyable. I highly recommend this home-based massage service for anyone in need of self-care.",
              "The at-home massage session I had with the massage specialist exceeded my expectations. ",
              " ", 
              " ",
              " ", 
              " ",
            ];
  let randNanes = ["Connor Thompson", "Mason Harris", "Nathan Rodriguez", "Dylan Martinez", "Jordan Walker", "Ethan Turner", "Cameron Wright", "Logan Anderson", "Justin Lewis", "Tyler Mitchell", "Brandon Moore", "Austin Taylor"];

  const generateAvgRating = () => {
    let rand = Math.floor((Math.random() * 2));
    let avgratingArr = [4, 4.5, 5];
    if(avgratingArr[rand] == 4){
      return (
        <div>
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-empty.png" alt="Empty" />
        </div>
      );
    }

    if(avgratingArr[rand] == 4.5){
      return (
        <div>
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-half.png" alt="Half" />
        </div>
      );
    }

    if(avgratingArr[rand] == 5){
      return (
        <div>
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
        </div>
      );
    }

  }

  const generateName = () => {
    let rand = Math.floor((Math.random() * 12));
    return randNanes[rand];
  };  

  const generateText = () => {
    let rand = Math.floor((Math.random() * 16));
    return reviewText[rand];
  };  
  
  const generateNumber = () => {
    let rand = Math.floor((Math.random() * 3));
    console.log("rands", rand);
    let possibleArr = [3.5,5,4.5,5];
    if(possibleArr[rand] == 3.5){
      return (
        <div>
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-half.png" alt="Half" />
          <img src="https://tsm.spagram.com/api/assets/img/star-empty.png" alt="Empty" />
  
        </div>
       );
    }

    if(possibleArr[rand] == 4){
      return (
        <div>
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-empty.png" alt="Empty" />
        </div>
      );
    }

    if(possibleArr[rand] == 4.5){
      return (
        <div>
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-half.png" alt="Half" />
        </div>
      );
    }

    if(possibleArr[rand] == 5){
      return (
        <div>
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
          <img src="https://tsm.spagram.com/api/assets/img/star-full.png" alt="Full" />
        </div>
      );
    }
      
  };  
  
  return (
    <div className='reviews-cnt'>
      <div class="reviewNumber avg"> Average Rating {generateAvgRating()}  </div>
      <p class="customer-name"> <strong> {generateName()} </strong> </p>
      <div class="reviewNumber"> {generateNumber()} </div>
      <p class="reviewText"> {generateText()} </p>
      <p class="customer-name"> <strong> {generateName()} </strong> </p>
      <div class="reviewNumber"> {generateNumber()} </div>
      <p class="reviewText"> {generateText()} </p>
      <p class="customer-name"> <strong> {generateName()} </strong> </p>
      <div class="reviewNumber"> {generateNumber()} </div>
      <p class="reviewText"> {generateText()} </p>
      <p> <a href="#/"> Load more. </a> </p>
    </div>
  );
});

export default ModelReview;