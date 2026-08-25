"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

// Importar los estilos core de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SliderImagenes({ imagenes = [] }) {
  if (!imagenes || imagenes.length === 0) return null;

  return (
    <div className="w-full my-8 relative rounded-2xl overflow-hidden shadow-xl">
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
              alt={`Diapositiva ${index + 1}`}
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