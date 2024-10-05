/* eslint-disable no-unused-vars */
// import { useState } from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Marquee from './Marquee';
import Banner from './Banner';
import Sliders from './Sliders';
import Footer  from './Footer';
import '../Css/index.css'
import FormComponent from '../Component/FormComponent';
function App() {
  

  return (
    <>
      <div>
       <Marquee />
       <Banner />
       <Sliders />
       <Footer />
    </div>
    </>
  )
}

export default App
