// Dependencies
import React, { useState, useEffect } from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
// import { useHistory } from 'react-router-dom';

// const history = useHistory();

// const customerdb_id = localStorage.getItem('customerdbid');
// const price = localStorage.getItem('price');

const MyPaymentForm = (params) => (
  <PaymentForm
    /**
     * Identifies the calling form with a verified application ID generated from
     * the Square Application Dashboard.
     */
    // //sandbox
    // applicationId="sandbox-sq0idb-90pxZJ69rbf3lNuPBFdURg"
    applicationId="sq0idp-gL8WgKdyA4DEv0Pa0eGi6A"
    /**
     * Invoked when payment form receives the result of a tokenize generation
     * request. The result will be a valid credit card or wallet token, or an error.
     */
    cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
      // console.log('token generated', token);
      // console.log('cid', params.customer_id);
      // console.log('price', params.price);
      const response = await fetch("https://tsm.spagram.com/api/square/pay.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({  
          sourceId: token.token,
          customerdb_id: params.customer_id,
          model_id: params.model_id,
          service_address: params.service_address,
          service_type: params.service_type,
          service_time: params.service_time,
          amount: params.price
        }),
      });
      console.log(await response.json());
      window.location.href = "/cardsaved";
      // console.log(await response);
    }}
    /**
     * This function enable the Strong Customer Authentication (SCA) flow
     *
     * We strongly recommend use this function to verify the buyer and reduce
     * the chance of fraudulent transactions.
     */
    createVerificationDetails={() => ({
      amount: '100',
      /* collected from the buyer */
      billingContact: {
        addressLines: ['123 Main Street', 'Apartment 1'],
        familyName: 'Doe',
        givenName: 'John',
        countryCode: 'GB',
        city: 'London',
      },
      currencyCode: 'GBP',
      intent: 'STORE',
    })}
    /**
     * Identifies the location of the merchant that is taking the payment.
     * Obtained from the Square Application Dashboard - Locations tab.
     */
    locationId="L9EE047NGRTAM"
  >
    <CreditCard>
      Save Card
    </CreditCard>
  </PaymentForm>
);

export default MyPaymentForm;