import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/model/layout';
import modelCss from '../../styles/model.module.css';
import ServicePricesUI from '../../components/servicePricesUI';
import withAuth from "../../components/admin/withAuth";
import Ethnicities from "../../components/data/ethnicities.js";
import Services  from "../../components/data/services.js";
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

  // const [selectedAreas, setSelectedAreas] = useState([]);
  const [initialMSg, setInitialMSg] = useState('');
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
    selectedAreas: Array(),
    location_type: Array(),
    incall_location: '',
    services: '',
    price: '',
    ethnicity: '',
    age: '',
    height: '',
    color: '',
    about: '',
    service_area: '',
    servicePrices: null,
    picture_url: ''
  });

  const areas = [
    {
      label: 'New York',
      options: [
        'Albany',
        'Binghamton',
        'Buffalo',
        'Catskills',
        'Chautauqua',
        'Elmira-corning',
        'Finger lakes',
        'Glens falls',
        'Hudson valley',
        'Ithaca',
        'Long island',
        'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'New Jersey', 'Long Island', 'Westchester', 'Fairfield',
        'Oneonta',
        'Plattsburgh-adirondacks',
        'Potsdam-canton-massena',
        'Rochester',
        'Syracuse',
        'Twin tiers NY/PA',
        'Utica-rome-oneida',
        'Watertown',
      ],
    },
    {
      label: 'New Jersey',
      options: ['Central NJ', 'Jersey shore', 'North jersey', 'South jersey', 'NJ suburbs of NYC (subregion of NYC site)'],
    },
    {
      label: 'Connecticut',
      options: ['Eastern CT', 'Hartford', 'New haven', 'Northwest CT', 'Fairfield county (subregion of NYC site)'],
    },
  ];


  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedServices([...selectedServices, name]);
    } else {
      setSelectedServices(selectedServices.filter((service) => service !== name));
    }
  };


  const handleAreaChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setModel({...model, selectedAreas: selectedOptions});

  };

  const handleLocationTypeChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setModel({...model, location_type: selectedOptions});

  };

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
      model.selectedAreas = model.selectedAreas.toString();
      model.location_type = model.location_type.toString();
      const serviceAll = selectedServices.join(",");
      model.services = serviceAll;
      // model.picture_url = file;
      model.servicePrices = JSON.stringify(servPri);
      console.log('model final',model);
      const response = await axios.post('https://spagram.com/api/update-model.php', model);
      console.log('model update', response.data);
      setMessage('Update successful')
      model.selectedAreas = model.selectedAreas.split(",");
      model.location_type = model.location_type.split(",");
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

    const params = new URLSearchParams(window.location.search);
    const source = params.get('source'); 
    console.log('from', source);
    source? setInitialMSg('Thanks for the Registration. Please finish your profile settings.') : '';

    const modelid = localStorage.getItem("token");
    setId(modelid);
    let url = "https://spagram.com/api/single-model.php?id=" + modelid;
    
    const getData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(url);
          const result = response.data;
          // setModel({...model, phone: '89999'})
          let areaArr = result.service_area.split(",");
          let locationTypeArr = result.location_type.split(",");
          let servicesArr = result.services.split(",");
          setSelectedServices(servicesArr);
          setModel({name: result.name, phone: result.phone, email: result.email, gender: result.gender, selectedAreas: areaArr, location_type: locationTypeArr, incall_location: result.incall_location,  price: result.price, ethnicity: result.ethnicity, 
            age: result.age, height: result.height, color: result.color, about: result.about, service_area: result.service_area, 
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
  }, []);

  return (
    <Layout profile>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <h2>  {initialMSg} </h2>
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
                      <option selected={'Trans' === model.gender}> Trans </option> 
                    </select>  </li> </ul>

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

         

          <ul> <li> Area you serve <br/>(press and hold ctrl/command to select multiple location) </li> <li> <select name='area' multiple value={model.selectedAreas} onChange={handleAreaChange} style={{ width: '100%', height: '300px' }}> 
          {
          areas.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </optgroup>
        ))}
        {console.log('aresss', model.selectedAreas)}
          
          </select>  </li> </ul>

          <ul> <li> Call Type </li> <li> <select name='gender' multiple value={model.location_type} onChange={handleLocationTypeChange}> 
                      <option value=""> Select</option> 
                      <option selected={'inCall' === model.gender}> inCall </option> 
                      <option selected={'outCall' === model.gender}> outCall </option> 
                    </select>  </li> </ul>

          <ul> <li> inCall Location </li> <li>
            <input type="text" onChange={handleInputChange} name="incall_location" value={model.incall_location}></input>  
                </li> 
          </ul>
                   
          <ul> <li> Rate per hour </li> <li>
                <input type="text" onChange={handleInputChange} name="price" value={model.price}></input>  
                    </li> 
            </ul>

            <ul> <li> Ethnicity </li> <li> <select name='ethnicity' onChange={handleInputChange}> 
                      <option value=""> Select</option> 
                      {
                        Ethnicities.map(item => (
                          <option selected={ item === model.ethnicity}> {item} </option> 
                        ))
                      }  
                     

                    </select>  </li> </ul> 
                         
            <ul> <li> Age </li> <li>
                <input type="text" onChange={handleInputChange} name="age" value={model.age}></input>  
                    </li> 
            </ul>

          <ul> <li> Height (in feet, ie 5.7) </li> <li>
          <input type="text" onChange={handleInputChange} name="height" value={model.height}></input>  
              </li> </ul>
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
          
          
           
          <button className='button' type="submit">Update Profile </button>
          <p className='message'> {message} </p>
        </form>
       : <h2> Loading....  </h2> }
      </section>
      
    </Layout>
  );
}


export default withAuth(Profile);