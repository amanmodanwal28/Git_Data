/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MarqueeWithBack from "../Component/MarqueeWithBack";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../Css/AttendentLogin.css';
// Import eye icons



const AttendentLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    // Redirect to login page if not logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/Attendent-Login');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'attendent' && password === 'railstaff@12') {
      setErrorMessage('');
      navigate('/Attendent-Login-Data');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <>
      <MarqueeWithBack />
      <Banner />
      
      <div className="loginContainer">
        <h2 className="loginHeading">Attendent Login</h2>
        <form className="loginForm" onSubmit={handleLogin}>
          <div className="formGroup">
            <label className="formLabel" htmlFor="username">Username</label>
            <input
              className="formInput"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label className="formLabel" htmlFor="password">Password</label>
            <div className="passwordInputWrapper">
              <input
                className="formInput"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
             <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash } />
            </span>
            </div>
          </div>

          {errorMessage && (
            <div className="errorMessage">
              {errorMessage}
            </div>
          )}

          <button className="loginButton" type="submit">Login</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default AttendentLogin;
