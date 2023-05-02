import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import utilStyles from  '../styles/utils.module.css';
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
      const response = await axios.post('https://spagram.com/api/login-model.php', formData);
      console.log('rest', response.data);
      if(response.data.success == '1') {
            const { token } = response.data;
            localStorage.setItem("token", token);
            Router.push("http://localhost:3005/model-backend");
            // window.location.href = location.state ? location.state.from.pathname : '/';
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

            <Link href='/model-registration'> Create a new Model Account </Link> 
 
        </div>

    </Layout>
  );
}

export default ModelLogin;