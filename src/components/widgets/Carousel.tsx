"use client"; // если Next.js App Router

import { ReactNode, memo } from "react";
import { Swiper, SwiperSlide, SwiperProps, SwiperSlideProps } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  slides: ReactNode[];
  swiperProps?: SwiperProps;
  swiperSlideProps?: SwiperSlideProps;
};

const Carousel = memo(function Carousel({ slides, swiperProps, swiperSlideProps }: Props) {
  if (!slides?.length) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, A11y]}
      slidesPerView={1}
      spaceBetween={12}
      autoplay={false}
      style={{ width: "100%", height: "100%" }}
      {...swiperProps}
    >
      {slides.map((slide, i) => (
        <SwiperSlide {...swiperSlideProps} key={i}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

export default Carousel;
