"use client";

import Image from "next/image";
import { useReproductor } from "@/context/ReproductorContext";
import { Play, Pause } from "lucide-react";

export default function TrackRowClient({ item, index, variant }) {
  const { trackUrl, playTrack } = useReproductor();
  const isPlayingNow = trackUrl === item.streamUrl;

  return (
    <button
      onClick={() => playTrack(item.streamUrl)}
      className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 text-left border 
        ${isPlayingNow ? "border-white bg-white/15" : "border-white/10 bg-white/5 hover:bg-white/15"}`}
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 shadow-md">
        <Image
          src={item.artwork_url}
          alt={item.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase text-zinc-700 tracking-wider">
          Episodio {(index + 1).toString().padStart(2, "0")}
        </p>
        <h3 className="font-bold text-white text-sm truncate">{item.title}</h3>
      </div>

      <div className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300
        ${isPlayingNow ? "bg-white text-black" : "border-white/20 text-white"}`}>
        {isPlayingNow ? <Pause size={14} fill="currentColor" className="animate-pulse" /> : <Play size={14} fill="currentColor" />}
      </div>
    </button>
  );
}