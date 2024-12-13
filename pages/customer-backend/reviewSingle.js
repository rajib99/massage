import React, { useState } from 'react';
import Link from 'next/link';
import modelStyle from '../../styles/model.module.css';
import axios from 'axios';




function ReviewSingle() {

    // const changestats = (status) => {
    //     const xx = changeOrderStatus(status);
    //     updateOrder(status);
        
    // }

    // const changestats = async (status) => {
    //     try {
    //         const reviewtoUpdate = {id: reviewto.id, reviewto_status: status, customer_id: reviewto.customer_id};
    //         const response = await axios.post('https://tsm.spagram.com/api/update-reviewto.php', reviewtoUpdate);
    //         console.log('s response', response.data );
    //         changeOrderStatus(status);
  
    //       } catch (err) {
    //         console.log(err)
    //         // setError(err.message);
    //       } finally {
    //         // setLoading(false);
    //       }
    // }

  // console.log('sssss', reviewto);
/*{ <td> {reviewto.reviewto_status} <br/> {reviewto.reviewto_status == "Initiated"?  <div><button onClick={()=>changestats("Approved")}>Approve</button>  <button onClick={()=>changestats("Denied")}>Deny</button> </div> : ''} </td>  }*/

/* { <form onSubmit={handleReviewUpdate}>
<div class="review-card">
    <div class="rating">4.5</div>
      <div class="user-details">
      <h2 class="user-name">John Doe</h2>
      <p class="comment">"Great product! Highly recommended."</p>
  </div>
</div>
<button className='button' type="submit"> Update </button>
<p className='message'> {message} </p>
</form> }*/
  return (
      <tr>
            <td> Provide Review to Andrea Sherri Parton {/*reviewto? reviewto.model_id : '' */} </td>
      </tr>
    
  );
}

export default ReviewSingle;



