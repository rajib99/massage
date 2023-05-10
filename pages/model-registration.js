import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import utilStyles from  '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import axios from 'axios';
import SingleModelView from '../components/singleModelView';
import Services  from "../components/data/services.js";
import modelCss from '../styles/model.module.css';






function ModelRegistration() {

    let serviceNamePrice = [];
    const [message, setMessage] = useState(null);
    const [singleModel, setSingleModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const singleApiUrl = "https://spagram.com/api/model-login"
    
  // useEffect(() => {
    
  //   // const { data } = 
  //   // console.log('data', data);
  //   // const modelUrl = 'https://spagram.com/api/models.php' +  '?id=' + data
  //   const getData = async () => {
  //       try {
  //         const response = await axios.get('singleApiUrl');
  //         setSingleModel(response.data);
          
  //         console.log('surl',singleApiUrl)
  //         console.log('sdata',response.data)
  //         setError(null);
  //       } catch (err) {
  //         setError(err.message);
  //         setSingleModel(null);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //   getData();
  // }, [singleApiUrl]);



    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      gender: '',
      height: '',
      color: '',
      about: '',
      password: '',
      service_area: '',
      servicePrices:'',
      services: '',
      price: '',
      image:'',
      
    });

    const [servicePrice, setServicePrice] = useState([]);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imgloading, setImgloading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedServices([...selectedServices, name]);
    } else {
      setSelectedServices(selectedServices.filter((service) => service !== name));
    }
  };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };


    // const handleChange = (e) => {
    //   // let serviceName =  e.target.getAttribute("msgName");
    //   // let price =  e.target.value;
    //   // serviceNamePrice = serviceName + ':' + price;
    //   // //console.log('np', serviceNamePrice);
    //   // setServicePrice(oldArray => [...oldArray, serviceNamePrice]);
    //   // // console.log('server', e.target.getAttribute("msgName") )
    // }

    const handleUpload = (e) => {

      let files = e.target.files;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
 
        fileReader.onload = (event) => {
            setFile(event.target.result);
            // console.log('file', event.target.result);
            setPreviewUrl(URL.createObjectURL(files[0]));

        }

      
    };
  


  const handleRegistration = async (e) => {
    e.preventDefault();
  

    setImgloading(true);
  //  formData.append('image', file);
    formData.image = file;
    formData.services = selectedServices.join(",");
    try {
      const response = await axios.post('https://spagram.com/api/create-model.php', formData);
      setMessage('Registration successful')
      setFormData(null);
      console.log('insert model', response.data);

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
            <h2> Fill the form to register as a member </h2>
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
                    <label>Gender:</label>
                    <select name='gender' onChange={handleChange}> 
                      <option value=""> Select</option> 
                      <option> Female </option> 
                      <option> Male </option> 
                    </select> 
                </div>
                <div>
                    <label>Height:</label>
                    <select name='height' onChange={handleChange}> 
                      <option> Height </option>
                      <option> over 6 feet </option>
                      <option> over 5 feet  </option>
                      <option> over 4 feet  </option>
                    </select> 
                </div>
                <div>
                    <label>Color:</label>
                    <select name='color' onChange={handleChange}> 
                      <option> Color </option>
                      <option> White </option>
                      <option> Black </option>
                    </select> 
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input type="file" id="picture_url" onChange={handleUpload} name="picture_url" accept="image/*" required/>
                    <img src={previewUrl} />
                </div>
                <div> <br/> 
                    <label>About You:</label>
                    <textarea id="about_you" onChange={handleChange} name="about" ></textarea>
                </div>
                <div>
                    <label>Service Area:</label>
                    <select name='service_area' onChange={handleChange}> 
                      <option value=""> Service Area </option> 
                      <option> Manhattan </option> 
                      <option> Brooklyn </option> 
                      <option> Queens </option> 
                      <option> Bronx </option> 
                      <option> Staten Island </option> 
                    </select> 
                </div>
                <div>
                    <p>Name of Services:</p>

                    <ul className={modelCss.servicesBack}>
                    <li>Services </li>
                    {Services.map((service) => (
                      <li key={service.id}>
                        <input
                          type="checkbox"
                          id={service.id}
                          name={service.name}
                          checked={selectedServices.includes(service.name)}
                          onChange={handleServiceChange}
                        />
                        <label htmlFor={service.id}>{service.name}</label>
                      </li>
                    ))}
                    
                  </ul>
                   
                    
                </div>
                <div>
                    <label>Price/hr:</label>
                    <input type="text" id="price" name="price" onChange={handleChange}  required/>
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