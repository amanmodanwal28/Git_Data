/* eslint-disable no-unused-vars */
// src/pages/Service.js
import React from 'react';
import MarqueeWithLogin from "../Component/MarqueeWithLogin";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import FormComponent from "../Component/FormComponent"; // Import the new FormComponent

const Service = () => {
  return (
    <div>
      <MarqueeWithLogin />
      <Banner />
      <FormComponent /> {/* Add the FormComponent here */}
      <Footer />
    </div>
  );
};

export default Service;
