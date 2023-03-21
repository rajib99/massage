import React, { useEffect } from "react";
import Router from "next/router";

const withAuthCustomer = (WrappedComponent) => {
  const HOC = (props) => {
    useEffect(() => {
      const token = localStorage.getItem("customertoken");
      if (!token) {
        Router.push("/customer-backend/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withAuthCustomer;
