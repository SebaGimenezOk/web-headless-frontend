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
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
    >
      {label}
    </button>
  );
}