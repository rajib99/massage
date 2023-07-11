import React, { useState } from 'react';
import Link from 'next/link';
import modelStyle from '../../styles/model.module.css';
import axios from 'axios';




function OrderSingle({ changeOrderStatus, order }) {

    // const changestats = (status) => {
    //     const xx = changeOrderStatus(status);
    //     updateOrder(status);
        
    // }

    const changestats = async (status) => {
        try {
            const orderUpdate = {id: order.id, order_status: status, customer_id: order.customer_id};
            const response = await axios.post('https://spagram.com/api/update-order.php', orderUpdate);
            console.log('s response', response.data );
            changeOrderStatus(status);
  
          } catch (err) {
            console.log(err)
            // setError(err.message);
          } finally {
            // setLoading(false);
          }
    }

  // console.log('sssss', order);
  return (
    <div>
      {order?
        <div>
          <div className={modelStyle.cell}> {order.date_of_creation} </div>
          <div className={modelStyle.cell}> {order.service_address} </div>
          <div className={modelStyle.cell}> {order.service_type} </div>
          <div className={modelStyle.cell}> {order.service_time} </div>
          <div className={modelStyle.cell}> {order.order_status} <br/> {order.order_status == "Initiated"?  <div><button onClick={()=>changestats("Approved")}>Approve</button>  <button onClick={()=>changestats("Denied")}>Deny</button> </div> : ''} </div>
        </div> : ''}
       
    </div>
  );
}

export default OrderSingle;