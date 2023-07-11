import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import utilStyles from  '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';






function ModelRegistration() {

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    const singleApiUrl = "https://spagram.com/api/model-login"
  


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


  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://spagram.com/api/create-model.php', formData);
      setMessage('Registration successful')
      setFormData(null);
      console.log('insert model', response.data.message);
      const { token } = response.data;
      const { message } = response.data;
      localStorage.setItem("token", token);
      
      console.log('insert id', message);

      Router.push("http://localhost:3005/model-backend/profile?source=registration");

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
      <div className="registration-container">
      <Link href='/model-login'> Login </Link> 
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
                
                <button className='button' type="submit">Submit</button>
                <p className='message'> {message}</p>

                
            </form>
 
        </div>

    </Layout>
  );
}

export default ModelRegistration;