/* eslint-disable no-unused-vars */
import React from 'react';
import ContainerFrame from './ContainerFrame';


// Import your images
import video1 from '../assets/img/home/video1.png';
import movie1 from '../assets/img/home/movie1.png';
import music1 from '../assets/img/home/music1.png';
import tourist from '../assets/img/home/Tourist.png';
import serviceRequest from '../assets/img/home/serviceRequest.png';
import journey1 from '../assets/img/home/trainJourneyB.png';
import kidszone2 from '../assets/img/home/kidszone2.png';

const Slider = () => {
  const slideData = [
    { src: movie1, caption: 'Movie', link: '/movies' },
    { src: video1, caption: 'Video', link: '/videos' },
    { src: music1, caption: 'Music', link: '/music' },
    { src: kidszone2, caption: 'Kids Zone', link: '/Kidszone' },
    { src: tourist, caption: 'Tourist', link: '/Tourist' },
    { src: serviceRequest, caption: 'Service', link: '/service' },
    { src: journey1, caption: 'Journey', link: '/journey' },
  ];

  return (
    <>
      <ContainerFrame slides={slideData} />
    </>
  );
};

export default Slider;
