"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function SliderImagenes({ imagenes = [] }) {
  if (!imagenes || imagenes.length === 0) return null;

  if (imagenes.length === 1) {
    return (
      <div className="w-full h-[350px] md:h-[480px] relative rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={imagenes[0]}
          alt="Imagen principal"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className="w-full relative rounded-2xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[350px] md:h-[480px] slider-custom"
      >
        {imagenes.map((src, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={src}
              alt={`Imagen ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}