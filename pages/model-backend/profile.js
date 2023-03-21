import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/model/layout';
import modelCss from '../../styles/model.module.css';
import ServicePricesUI from '../../components/servicePricesUI';
import withAuth from "../../components/admin/withAuth";
import axios from 'axios';


//name,phone,email,gender,height,color,about,service_area,servicePrices,image,


const Profile = () => {

  // const originalUrl = 'https://spagram.com/api/models.php';
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
    modelId: '',
    name: '',
    phone: '',
    email: '',
    gender: '',
    height: '',
    color: '',
    about: '',
    service_area: '',
    servicePrices: null,
    picture_url: ''
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
      model.modelId = id;
      // model.picture_url = file;
      model.servicePrices = JSON.stringify(servPri);
      console.log('model final',model);
      const response = await axios.post('https://spagram.com/api/update-model.php', model);
      setMessage('Update successful')
    } catch (error) {
      console.error(error);
    }

  };

  function handleServPri(){

  }

  const handleServChange = (index, property, value) => {
    //setModel({...servPri, [e.target.name]:  e.target.value})
    // setServPri(servPri.map(sp => {
    //   if(sp.id === index){
    //     return{...sp, price: e.target.value};
    //   }else{
    //     return sp;
    //   }
    // }))
    // setServPri({...servPri, price: e.target.value})
 
    //   const values = [...servPri];
  // values[index] = {...values[index], price: e.target.value}
  // setServPri(values);


    const values = [...servPri];
    values[index][property] = value;
    setServPri(values);
  }



  // function showPrices(sp){
  //   return(
  //     sp && sp.map((sps) => (
  //         <ul><li> {sps.name} </li> <li> $ <input type="text" onChange={handleServChange} value={sps.Price}></input> </li></ul>
  //       ))

      
  //   ) 
    
  // }


  useEffect(() => {
    const modelid = localStorage.getItem("token");
    setId(modelid);
    let url = "https://spagram.com/api/single-model.php?id=" + id;
    
    const getData = async (id) => {
        try {
          setLoading(true);
          const response = await axios.get(url);
          const result = response.data;
          // setModel({...model, phone: '89999'})
          
          setModel({name: result.name, phone: result.phone, email: result.email, gender: result.gender, 
            height: result.height, color: result.color, about: result.about, service_area: result.service_area, 
            servicePrices: result.services_prices, picture_url: result.picture_url })
            
            setServPri(result.services_prices)
          
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
    <Layout profile>
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
          <ul> <li> Gender </li> <li> <select name='gender' onChange={handleInputChange}> 
                      <option value=""> Select</option> 
                      <option selected={'Female' === model.gender}> Female </option> 
                      <option selected={'Male' === model.gender}> Male </option> 
                    </select>  </li> </ul>
          <ul> <li> Height </li> <li> <select name='height' onChange={handleInputChange}> 
                      <option> Height </option>
                      <option selected={'over 6 feet' === model.height}> over 6 feet </option>
                      <option selected={'over 5 feet' === model.height}> over 5 feet  </option>
                      <option selected={'over 4 feet' === model.height}> over 4 feet  </option>
                    </select>  </li> </ul>
          <ul> <li> Color </li> <li> 
          <select name='color' onChange={handleInputChange}> 
                      <option> Color </option>
                      <option selected={'White' === model.color}> White </option>
                      <option selected={'Black' === model.color}> Black </option>
            </select> 
                     </li> </ul>
                     
          <ul> <li> About </li> <li> <textarea onChange={handleInputChange} name="about" value={model.about}></textarea> </li> </ul>

          <ul> <li> Profile Picture </li> <li> <img src={model.picture_url}></img>  <input type="file" id="picture_url" onChange={handleFileUpload} name="picture_url" accept="image/*" /> </li> </ul>
          
            {/* {model.servicePrices.split(",").map((spString) => ( <ServicePricesUI {...spString}  /> ) )} */}
          {/* {console.log('sd', typeof servp)} */}
           {/* {showPrices(servPri) } */}

          { servPri && servPri.map((sps, index) => (
          <ul key={sps.id}><li> {sps.name} </li> <li> $ <input type="text" onChange={(event) => handleServChange(index, 'Price', event.target.value)} value={sps.Price}></input> </li></ul>
        )) }
          
          
           
          <button className='button' type="submit">Submit ss</button>
          <p className='message'> {message} </p>
        </form>
       : <h2> Loading....  </h2> }
      </section>
      
    </Layout>
  );
}


export default withAuth(Profile);