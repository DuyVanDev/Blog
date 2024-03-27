"use client"
import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const Banner = () => {
    const slide = ["https://admin-netco.vps.vn//Image/ckfinder/files/z5128455973861_d85b3623e1c2c8803bf40c955ad12e1f.jpg","https://admin-netco.vps.vn//Image/ckfinder/files/z5128455973861_d85b3623e1c2c8803bf40c955ad12e1f.jpg","https://admin-netco.vps.vn//Image/ckfinder/files/z5128455973861_d85b3623e1c2c8803bf40c955ad12e1f.jpg"]
  return (
    <div>
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      loop={true}
      pagination={{ clickable: true }}
      slidesPerView={1}
      centeredSlides={true}
      scrollbar={{ draggable: true }}
      navigation
      autoplay={{
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      }}
    >
      {slide.length > 0 && slide?.map((item, index) => {
        return (
          <SwiperSlide key={index} >
            <div key={index}>
              <img className="w-full h-full object-contain" src={item} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
    </div>
  )
}

export default Banner