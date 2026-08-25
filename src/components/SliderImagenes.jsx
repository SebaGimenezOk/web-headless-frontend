"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SliderImagenes({ imagenes = [] }) {
  // 1. Si no hay imágenes, no renderiza nada
  if (!imagenes || imagenes.length === 0) return null;

  // 2. Si hay solo UNA imagen, renderiza un contenedor estático limpio (sin slider ni flechas)
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

  // 3. Si hay 2 o más imágenes, activa el slider completo
  return (
    <div className="w-full relative rounded-2xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
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