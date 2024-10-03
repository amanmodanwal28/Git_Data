/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../Css/MarqueeWithBack.css'; // Import a CSS file for styling

const MarqueeWithBack = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <div className="marquee-button-container">
         <button className="back-button" onClick={() => navigate(-1)}>
         Back
        </button>
      <div className="marqueewithBack">
      <div className="marquee-content">
          Welcome to Indian Railway !!
        </div>
      </div>
     
    </div>
  );
};

export default MarqueeWithBack;
