"use client";

import Image from "next/image";
import { useReproductor } from "@/context/ReproductorContext";

export default function TrackRowClient({ item, index }) {
  // 🟢 CORRECCIÓN: Traemos 'playTrack' que es lo que tu contexto realmente exporta
  const { playTrack } = useReproductor();

  const imageSrc = item.artwork_url 
    ? item.artwork_url.replace("-large.", "-t500x500.") 
    : "/encabezado-cronicas-mobile.jpg"; 

  const handlePlay = (e) => {
    e.preventDefault();
    
    console.log("Despachando audio al reproductor:", item.streamUrl);
    
    // 🟢 CORRECCIÓN: Usamos la función correcta
    playTrack(item.streamUrl);
  };

  return (
    <button
      onClick={handlePlay}
      className="w-full flex items-center justify-between py-4 group transition-colors duration-200 hover:bg-black/5 rounded-lg px-2 -mx-2 text-left"
    >
      <div className="flex items-center gap-4 pr-3">
        <span className="text-xs font-bold text-text/30 w-4 text-right group-hover:text-text">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
          <Image
            src={imageSrc}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="font-bold text-text text-sm md:text-base tracking-tight line-clamp-1 group-hover:underline decoration-1 underline-offset-4">
            {item.title}
          </h3>
          {item.date && (
            <p className="text-[11px] text-text/50 mt-0.5">{item.date}</p>
          )}
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-text/15 group-hover:border-text group-hover:bg-text transition-all duration-200">
        <svg
          className="w-3 h-3 text-text group-hover:text-background translate-x-px transition-colors duration-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </button>
  );
}