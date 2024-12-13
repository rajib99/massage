import React, { useState, useEffect } from 'react';
import { CURRENT_URL } from '../components/config.js';
import Head from 'next/head';
import utilStyles from  '../styles/utils.module.css';
// import globalcss from  '../styles/globals.css';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';





function ModelLogin() {

    let serviceNamePrice = [];
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    
    

    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };


  const handleRegistration = async (e) => {
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


  return (
    <Layout>
      <Head>
        <title> Model Register/Login page</title>
      </Head>
      <div className="registration-container single-login">
           
            <form onSubmit={handleRegistration}>
                
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

            <Link href='/model-registration'> Not a member? Click to create a new model account </Link> 
 
        </div>

    </Layout>
  );
}

export default ModelLogin;