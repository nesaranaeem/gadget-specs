import React from "react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation, Pagination, Controller } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

SwiperCore.use([Navigation, Pagination, Controller]);

const slides = [
  {
    id: 1,
    image:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1680472302915-a7781bec78a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80')",
    title: "Slide 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    buttonText: "Learn More",
    buttonLink: "#routes",
  },
  {
    id: 2,
    image:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1680472302915-a7781bec78a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80')",
    title: "Slide 2",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonText: "Get Started",
    buttonLink: "/slide2",
  },
];

const ImageSlider = () => {
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <div className="w-full">
      <Swiper
        onSwiper={setControlledSwiper}
        controller={{ control: controlledSwiper }}
        navigation
        pagination={{ clickable: true }}
        className="my-6"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-screen flex items-center justify-center text-white text-4xl font-bold"
              style={{
                backgroundImage: slide.image,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center">
                <h2 className="mb-4">{slide.title}</h2>
                <p className="mb-8">{slide.text}</p>
                <a
                  href={slide.buttonLink}
                  className="hover:shadow-form rounded-md bg-[#6A64F1] dark:bg-gray-800 dark:hover:dark:bg-gray-900 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
