"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

// Importación directa de los estilos del Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SliderImagenes({ imagenes = [] }) {
  // 1. Si no hay imágenes válidas
  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="w-full p-4 text-center border border-dashed border-gray-300 text-gray-400 rounded-xl">
        No hay imágenes disponibles para el slider.
      </div>
    );
  }

  // 2. Si hay 1 sola imagen
  if (imagenes.length === 1) {
    return (
      <div className="w-full h-[350px] md:h-[480px] relative rounded-2xl overflow-hidden shadow-xl bg-gray-900">
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

  // 3. Slider con múltiples imágenes
  return (
    <div className="w-full h-[350px] md:h-[480px] relative rounded-2xl overflow-hidden shadow-xl bg-gray-900">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
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