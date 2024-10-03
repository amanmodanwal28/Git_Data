/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import '../Css/Slider.css';

function ContainerFrame({ slides }) {
  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        450: { slidesPerView: 2 },
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
              {slide.caption}{' '}
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
  )
}

export default ContainerFrame;
