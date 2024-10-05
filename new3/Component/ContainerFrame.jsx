/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import '../Css/Slider.css';

function ContainerFrame({ slides }) {
  const [isVertical, setIsVertical] = useState(window.innerWidth < 768);

  // Update direction on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Added cleanup function
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      direction={isVertical ? 'vertical' : 'horizontal'} // Vertical on small screens
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        320: { slidesPerView: 1 }, // 1 slide for very small devices
        450: { slidesPerView: 2 }, // 2 slides for larger phones
        670: { slidesPerView: 3 },
        768: { slidesPerView: 3 },
        980: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
        1400: { slidesPerView: 6 },
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Link to={slide.link} className="box">
            <p className="caption" onContextMenu={(e) => e.preventDefault()}>
              {slide.caption}
            </p>
            <img
              src={slide.src}
              alt={`Slide ${index}`}
              onContextMenu={(e) => e.preventDefault()}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ContainerFrame;
