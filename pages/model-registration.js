import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import utilStyles from  '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/layout';
import{ CURRENT_URL } from '../components/config';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';

function ModelRegistration() {

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   

    const singleApiUrl = "https://tsm.spagram.com/api/model-login"
  


    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      password: '',
    });

    const [servicePrice, setServicePrice] = useState([]);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };



    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://tsm.spagram.com/api/login-model.php', formData);
        console.log('rest', response.data);
        if(response.data.success == '1') {
              const { token } = response.data;
              const { success } = response.data;
              localStorage.setItem("token", token);
              let orderUrl = CURRENT_URL + 'model-backend/orders';
              Router.push(orderUrl);
              
              
              // window.location.href = location.state ? location.state.from.pathname : '/';
        }else{
          setError('Email/Password do not match. Please try again!');
        }
    
      } catch (error) {
        console.error(error);
      }
    };


  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("endpoint hit")
      const response = await axios.post('https://tsm.spagram.com/api/create-model-quick.php', formData);
      console.log('response', response)
      setFormData(null);
      console.log('insert model', response.data.message);
      const { token } = response.data;
      const { message } = response.data;
      setMessage('Registration successful');
      localStorage.setItem("token", token);
      setLoading(false)
      
      console.log('insert id', message);
      let profile_source =  CURRENT_URL + 'model-backend/profile?source=registration';
      Router.push(profile_source);

      //   const { token } = response.data;
      //   localStorage.setItem("token", token);
      //   Router.push("http://localhost:3005/admin-backend");
        // window.location.href = location.state ? location.state.from.pathname : '/';
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Layout>
      <Head>
        <title> Model Register/Login page</title>
      </Head>
      <div class="registration-page"> 
        <div class="login-cnt">
         <h2> Login as a Model </h2>
         <form onSubmit={handleLogin}>
                
                <div>
                    <label>Email:</label>
                    <input type="email" id="email" name="email" onChange={handleChange} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" id="password" name="password" onChange={handleChange}  required/>
                </div>
                
                <button className='button' type="submit">Submit</button>
                <p className='message'> {message}</p>
            </form>
           <p> {error? error: ''} </p>
        
        </div>
        <div className="registration-container">
       
            <h2> Fill the form to register as a Model </h2>
            <form onSubmit={handleRegistration}>
                <div>
                    <label>Name:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="tel" id="phone" name="phone" onChange={handleChange} required/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" id="email" name="email" onChange={handleChange} required/>
                </div>
                
                <div>
                    <label>Password:</label>
                    <input type="password" id="password" name="password" onChange={handleChange}  required/>
                </div>
                
                <div class="submitbox"> 
                <button className='button' type="submit">Submit</button>
                 { loading? <img width="30px" src="images/loading.gif" />: ' ' } 
                </div>
                <p className='message'> {message}</p>
                If you are already a member <Link href='/model-login'> Login </Link>

                
            </form>
 
        </div>
      
      </div>
      

    </Layout>
  );
}

export default ModelRegistration;