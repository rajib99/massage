import React, { useState } from 'react';

const GeolocationExample = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const showPosition = (position) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
    // setLocation({
    //   latitude: position.coords.latitude,
    //   longitude: position.coords.longitude,
    // });
    setError(null);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setError('The request to get user location timed out.');
        break;
      default:
        setError('An unknown error occurred.');
        break;
    }
  };

  return (
    <div>
      <h1>Geolocation API Example</h1>
      <button onClick={getLocation}>Get Location</button>
      {longitude}
      </div>
      )
      }


 export default GeolocationExample;