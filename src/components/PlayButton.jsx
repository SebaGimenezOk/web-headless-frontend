"use client";

import { useReproductor } from "@/context/ReproductorContext";

export default function PlayButton({ url, label = "▶ Reproducir" }) {
  const { playTrack } = useReproductor();

  const handleClick = () => {
    playTrack(url);
  };

  return (
    <button
      onClick={handleClick}
      className= "inline-flex cursor pointer  items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#f8f5ee] hover:bg-[#efece4] text-neutral-800 border border-[#e5e0d8] text-xs uppercase tracking-wider transition-colors rounded-xl font-medium shadow-sm"
       >
      {label}
    </button>
  );
}