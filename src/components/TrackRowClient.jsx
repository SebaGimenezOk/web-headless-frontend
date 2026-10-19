"use client";

import Image from "next/image";
import { useReproductor } from "@/context/ReproductorContext";
import { Play, Pause } from "lucide-react";

export default function TrackRowClient({ item, index, variant = "default", temporada = "2026" }) {
  const { trackUrl, playTrack } = useReproductor();
  const isPlayingNow = trackUrl === item.streamUrl;

  const episodeNumber = (index + 1).toString().padStart(2, "0");

  return (
    <button
      onClick={() => playTrack(item.streamUrl)}
      className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 text-left border group
        ${isPlayingNow 
          ? "border-[#bfa15f] bg-[#bfa15f]/10 shadow-md" 
          : "border-zinc-200/80 bg-zinc-50/60 hover:bg-zinc-100 hover:border-zinc-300 shadow-xs"}`}
    >
      {/* Miniatura con indicador de reproducción */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm border border-zinc-200">
        <Image
          src={item.artwork_url}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {isPlayingNow && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
            <span className="w-3 h-3 bg-[#bfa15f] rounded-full animate-ping" />
          </div>
        )}
      </div>

      {/* Textos del episodio */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#bfa15f]/15 text-[#bfa15f] tracking-wider">
            Ep. {episodeNumber}
          </span>
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">
            Temporada {temporada}
          </span>
        </div>
        
        <h3
          style={{ fontFamily: "var(--font-body)" }}
          className="text-zinc-900 font-semibold text-sm md:text-base truncate group-hover:text-[#bfa15f] transition-colors"
        >
          {item.title}
        </h3>
      </div>

      {/* Botón de Play / Pause */}
      <div
        className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-sm
        ${isPlayingNow 
          ? "bg-[#bfa15f] text-white shadow-[#bfa15f]/30 scale-105" 
          : "bg-white border border-zinc-200 text-zinc-700 group-hover:bg-[#bfa15f] group-hover:text-white group-hover:border-[#bfa15f]"}`}
      >
        {isPlayingNow ? (
          <Pause size={16} fill="currentColor" className="animate-pulse" />
        ) : (
          <Play size={16} fill="currentColor" className="ml-0.5" />
        )}
      </div>
    </button>
  );
}