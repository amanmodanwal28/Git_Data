/* eslint-disable no-unused-vars */
// src/Footer.js
import React from 'react';
import '../Css/Footer.css'; // Import the CSS file for styling
import logoImage from  '../assets/img/logo.jpg'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content" onContextMenu={(e) => e.preventDefault()}>
        <img src={logoImage} alt="Logo" className="footer-logo" />

        <p>PT Communications Pvt Ltd. @All rights reserved.</p>
      </div>
    </footer>
  )
};

export default Footer;
