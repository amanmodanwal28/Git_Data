/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';
import MarqueeWithBack from "../Component/MarqueeWithBack";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import '../Css/PlaceDetail.css';

const PlaceDetail = () => {
  const location = useLocation();
  const place = location.state; // Access the place data passed through state

  if (!place) {
    return <h2>No place data available.</h2>;
  }


  return (
    <>
      <MarqueeWithBack />
      <Banner />
      <div className="place-detail">
        <h1>{place.name}</h1>
        <img
          src={place.image2}
          alt={place.name}
          className="place-detail-image"
          onContextMenu={(e) => e.preventDefault()}
        />
        <p
          className="place-description"
          dangerouslySetInnerHTML={{ __html: place.descriptionDetail }}
        />
      </div>
      <Footer />
    </>
  )
};

export default PlaceDetail;
