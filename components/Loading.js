import React from 'react';
import loadstyle from  '../styles/loading.module.css';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__icon"><img src='/images/loading.gif' alt="Loading Image" />
    </div>
    </div>
  );
};

export default Loading;
