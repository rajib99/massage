import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/model/layoutCustomer';
import modelCss from '../../styles/model.module.css';
import ServicePricesUI from '../../components/servicePricesUI';
import withAuth from "../../components/admin/withAuthCustomer";
import axios from 'axios';


//name,phone,email,gender,height,color,about,service_area,servicePrices,image,


const Profile = () => {

  // const originalUrl = 'https://tsm.spagram.com/api/models.php';
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
  const [model, setModel] = useState({
    customerId: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    password: ''
  });


  const handleInputChange = (e) => {
    setModel({...model, [e.target.name]:  e.target.value})
  }

  const handleFileUpload = (e) => {

    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

      fileReader.onload = (event) => {
          // setFile(event.target.result);
          setModel({...model, picture_url:event.target.result })
      }


    
  };

  const handleModelUpdate = async (e) => {
    e.preventDefault();
    try {
      model.customerId = id;
      // model.picture_url = file;
      model.servicePrices = JSON.stringify(servPri);
      console.log('model final',model);
      const response = await axios.post('https://tsm.spagram.com/api/update-customer.php', model);
      console.log('post reply', response.data, response.status)
      response.data == "1" ? setMessage('Update successful') : setMessage('Something is wrong! Please contact admin')
      
    } catch (error) {
      console.error(error);
    }

  };

  function handleServPri(){

  }


  // function showPrices(sp){
  //   return(
  //     sp && sp.map((sps) => (
  //         <ul><li> {sps.name} </li> <li> $ <input type="text" onChange={handleServChange} value={sps.Price}></input> </li></ul>
  //       ))

      
  //   ) 
    
  // }


  useEffect(() => {
    const modelid = localStorage.getItem("customertoken");
    setId(modelid);
    console.log('id', modelid);
    let url = "https://tsm.spagram.com/api/single-customer.php?id=" + id;
    
    const getData = async (id) => {
        try {
          setLoading(true);
          const response = await axios.get(url);
          const result = response.data;
          // setModel({...model, phone: '89999'})
          console.log('customer reuturned', result);
          
          setModel({name: result.name, phone: result.phone, email: result.email, address: result.address, password: result.Password})
          
            setLoading(false);
          setError(null);
        } catch (err) {
          setError(err.message);
          // setData(null);
        } finally {
          setLoading(false);
        }
      };

    getData();
  }, [id]);

  return (
    <Layout customerprofile>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <h2>  Personal info  </h2>

      <section className={modelCss.profileEdit}>
        {!loading? 
        <form onSubmit={handleModelUpdate}>
          <ul> <li> Name </li> <li> <input type="text" onChange={handleInputChange} name="name" value={model.name}></input> </li> </ul>
          <ul> <li> Phone </li> <li> <input type="text" onChange={handleInputChange} name="phone" value={model.phone}></input> </li> </ul>
          <ul> <li> Email </li> <li> <input type="text" onChange={handleInputChange} name="email" value={model.email}></input> </li> </ul>
          <ul> <li> Password </li> <li> <input type="password" onChange={handleInputChange} name="password" value={model.password}></input> </li> </ul>
          
          
           
          <button className='button' type="submit"> Update </button>
          <p className='message'> {message} </p>
        </form>
       : <h2> Loading....  </h2> }
      </section>
      
    </Layout>
  );
}


export default withAuth(Profile);