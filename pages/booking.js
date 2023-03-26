import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import utilStyles from  '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import Router from 'next/router';
import axios from 'axios';
import SingleModelView from '../components/singleModelView';
import Loading from '../components/Loading';





function Booking() {

    const [formData, setFormData] = useState({name: '', email: '', phone: '', address: '', cardname: '', card: '', expiration: '', cvv: '', password: '', selected_model: ''});  

    const [succMessage, setSuccMessage] = useState(null);
    const [modelID, setModelID] = useState(null);
    const [singleModel, setSingleModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState(null);
    const [loginmessage, setLoginmessage] = useState("");
    const [loginform, setLoginform] = useState(true);

    const [loginformData, setLoginformData] = useState({
      email: '',
      password: '',
    });
  
    const handleLoginFieldChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };


    const router = useRouter();
    const {singleApiUrl} = router.query;
    // console.log('urs', singleApiUrl);

   
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };



    const confirmorder = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://spagram.com/api/confirmorder.php', formData);
        console.log('rest', response.data);
        if(response.data.success == '1') {
              const { token } = response.data;
              localStorage.setItem("customertoken", token);
              
              // window.location.href = location.state ? location.state.from.pathname : '/';
        }
  
    
      } catch (error) {
        console.error(error);
      }
    };


    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://spagram.com/api/login-customer.php', formData);
        console.log('rest', response.data);
        if(response.data.success == '1') {
              const { token } = response.data;
              localStorage.setItem("customertoken", token);
              setIsLoggedIn(true);
              // window.location.href = location.state ? location.state.from.pathname : '/';
        }else{
          setLoginmessage("Email/Password is not correct. Please try again or click to the button below to register. ");
        }
  
    
      } catch (error) {
        console.error(error);
      }
    };
    

    const handleCustomerRegistration = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSuccMessage("");
      try {
        formData.selected_model = modelID;
        const response = await axios.post('https://spagram.com/api/register-customer.php', formData);
        console.log('client data', formData);
        console.log('rest', response.data);
        if(response.data.success == '1') {
              const { usertoken } = response.data;
              localStorage.setItem("usertoken", usertoken);
              setSuccMessage("Your registration is successful");
              setFormData({name: '', email: '', phone: '', address: '', cardname: '', card: '', expiration: '', cvv: '', password: ''});
              // router.push("http://localhost:3005/customer-success");
              // window.location.href = location.state ? location.state.from.pathname : '/';
              console.log('shos', usertoken);
              setLoading(false);
        }else{
          setLoading(false);
          setSuccMessage("Error! Please contact support.");
        }
    
    
      } catch (error) {
        console.error(error);
      }
    };

  const userLogin = () => {
    
     const token = localStorage.getItem("customertoken");
     console.log('h', token);
      if (token) {
        setIsLoggedIn(true);
      }
  }
    
  useEffect(() => {

    userLogin();
    // const { data } = 
    // console.log('data', data);
    // const modelUrl = 'https://spagram.com/api/models.php' +  '?id=' + data
    const getData = async () => {
        try {
          const response = await axios.get(singleApiUrl);
          setSingleModel(response.data);
          setModelID( singleApiUrl.split("=")[1] );
          
          console.log('surl',singleApiUrl)
          console.log('sdata',response.data)
          setError(null);
        } catch (err) {
          setError(err.message);
          setSingleModel(null);
        } finally {
          setLoading(false);
        }
      };
    getData();
  }, [singleApiUrl]);


  return (
    <Layout>
      <Head>
        <title> Book a model </title>
      </Head>
      <div className='messageBox'> $10% <span className='price'> {}</span> will be deducted from your card after the 
the model accepting the request. We will save your card for now in a secure server but won't charge until the model accept the request  </div>
      <div className="col2">
       
            <div> 
                <h1> Your selected model:</h1>


                {loading && <div>Loading...</div>}
                    {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}

                {/* {singleModel && console.log('smodel', ...singleModel) } */}

                {singleModel && <SingleModelView  {...singleModel} /> }        
            </div>
            {!isLoggedIn? 
            <div className='fullwidth'>
             {loginform ? 
                    <div className="registration-container">
                
                      <form onSubmit={handleLogin}>
                          
                          <div>
                              <label>Email:</label>
                              <input type="email" id="email" name="email" onChange={handleLoginFieldChange} required/>
                          </div>
                          <div>
                              <label>Password:</label>
                              <input type="password" id="password" name="password" onChange={handleLoginFieldChange}  required/>
                          </div>
                          
                          <button className='button' type="submit">Submit</button>
                          <p className='message'> {message}</p>
                      </form>

                      <p> {loginmessage} </p>

                      <div className='button' onClick={()=>setLoginform(false)}> Not a member? Click to register </div> 
      
              </div>
              : 
              <div>
              <h2> Fill the form </h2>
              <form onSubmit={handleCustomerRegistration}>
              <label for="name">Name:</label>
              <input type="text" id="name" onChange={handleChange} name="name" value={formData.name}/>

              <label for="email">Email:</label>
              <input type="email" id="email" onChange={handleChange} name="email" value={formData.email}/>

              <label for="phone">Phone: (Don't add country code +1, don't add white space ) </label>
              <input type="tel" id="phone" onChange={handleChange} name="phone" value={formData.phone}/>

              <label for="address">Home Address:</label>
              <textarea id="address" onChange={handleChange} name="address" value={formData.address}></textarea>

              <label for="card">Name on the card:</label>
              <input type="text" id="cardname" onChange={handleChange} name="cardname" value={formData.cardname} />
              <label for="card">Card info:</label>
              <input type="text" id="card" onChange={handleChange} name="card" placeholder='Card Number' value={formData.card} />
              <div className='col2 cardinfo'> <input type="text" onChange={handleChange} id="expiration" name="expiration" placeholder=" Expiration date " value={formData.expiration}  /> <input type="text" id="cvv" name="cvv" placeholder="Security Code "  onChange={handleChange} value={formData.cvv}   /> </div>
              <label for="name">Create Password:</label>
              <input type="password" id="password" onChange={handleChange} name="password"  value={formData.password}  />
              <input type="hidden" id="selected_model" name="selected_model" value={modelID}/>
                  <button className='button' type="submit">Submit</button>
                  {loading && <Loading/>}
                  <h2> {succMessage} </h2>
              </form>
              <div className='button' onClick={()=>setLoginform(true)}> Member? Click to login </div> 
          </div>
             }
           </div>
            :
             <div> <a className='button' onClick={confirmorder}> Reserve the Appointment </a> </div>
            }
 
            
        </div>

       <Link href="/"> Go back to Homepage</Link>
    </Layout>
  );
}

export default Booking;