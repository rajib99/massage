import { Client } from 'square';
import { randomUUID } from 'crypto';

BigInt.prototype.toJSON = function() { return this.toString(); }

const { paymentsApi, customersApi, cardsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});


 // try {
    //   const response = await cardsApi.retrieveCard('CARD_ID');
    
    //   console.log('card retrived', response.result);
    // } catch(error) {
    //   console.log(error);
    // }


    // "GSPWHKPAAWR173VF5B9MGS1NQ8"

export default async function handler(req, res) {
  if ( req.method === 'POST' ) {   
    // const { result } = await paymentsApi.createPayment({
    //   idempotencyKey: randomUUID(),
    //   sourceId: req.body.sourceId,
    //   amountMoney: {
    //     currency: 'USD',
    //     amount: req.body.amount
    //   }
    // })

    const customer_response  = await customersApi.createCustomer({
      givenName: 'Dave Wood',
      emailAddress: 'zordelalex@gmail.com'
    })
    const csid = customer_response.result.customer.id;
    try{
    const card_response = await cardsApi.createCard({
      idempotencyKey: randomUUID(), 
      sourceId: req.body.sourceId,
      card: {
        cardholderName: 'Amelia Earhart',
        billingAddress: {
          addressLine1: '500 Electric Ave',
          addressLine2: 'Suite 600',
          locality: 'New York',
          administrativeDistrictLevel1: 'NY',
          postalCode: '10003',
          country: 'US'
          },

        customerId: csid,
        referenceId: 'user-asd222a2',  
      }

    })
    
    // console.log('custoerm id', card_response.result);
    res.status(200).json(card_response.result);
  }catch(error){
    console.log(error);
  }

  } else {
    res.status(500).send();
  }
}