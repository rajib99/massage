import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/model/layoutCustomer';
import reviewCss from '../../styles/model.module.css';
import ServicePricesUI from '../../components/servicePricesUI';
import withAuth from "../../components/admin/withAuthCustomer";
import axios from 'axios';
import ReviewSingle from "./reviewSingle.js";


//name,phone,email,gender,height,color,about,service_area,servicePrices,image,


const Review = () => {

  // const originalUrl = 'https://tsm.spagram.com/api/reviews.php';
  // const [baseUrl, setBaseUrl] = useState(originalUrl);
  // const [servPri, setServPri] = useState([
  //   { id: 1, name: 'Service 1', Price: '10' },
  //   { id: 2, name: 'Service 2', Price: '20' }
  // ]);


  // [{"id": "1", "name":"Swedish massage","Price":"44"}, {"id": "2", "name":"Deep massage","Price":"144"}]

  const [servPri, setServPri] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const [review, setReview] = useState();
  // const [review, setReview] = useState({
  //   id: '',
  //   model_name: '',
  //   review_count: ''
  // });

  const reveiwDummy = [ {"Name": "Helena Dummy", "id": "11" }, {"Name": "Helena Dummy", "id": "11" }]



  // const handleReviewUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     review.reviewId = id;
  //     // review.picture_url = file;
  //     review.servicePrices = JSON.stringify(servPri);
  //     console.log('review final',review);
  //     const response = await axios.post('https://tsm.spagram.com/api/update-customer.php', review);
  //     setMessage('Update successful')
  //   } catch (error) {
  //     console.error(error);
  //   }

  // };



  // useEffect(() => {
  //   const customer_id = localStorage.getItem("customertoken");
  //   setId(customer_id);
  //   console.log('id', customer_id);
  //   let url = "https://tsm.spagram.com/api/get-orders-to-review.php?customer_id=" + customer_id;
    
  //   const getData = async (id) => {
  //       try {
  //         setLoading(true);
  //         const response = await axios.get(url);
  //         const result = response.data;
  //         // setReview({...review, phone: '89999'})
  //         console.log('customer reuturned', result, typeof result);
          
  //         setReview(result)
          
  //         setLoading(false);
  //         setError(null);
  //       } catch (err) {
  //         setError(err.message);
  //         // setData(null);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //   getData();
  // }, [id]);



  return (
    <Layout customerreview>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <h2> Review  </h2>

      <section className={reviewCss.reviewEdit}>
        {!loading? 
        <> 
         {reveiwDummy && reveiwDummy.map((rev, index) => (
          // <ReviewSingle key={index} reviewto={rev}  />
          <ReviewSingle  />
        ))}
        </>
       : <h2> Loading....  </h2> }
      </section>
      
    </Layout>
  );
}


export default withAuth(Review);