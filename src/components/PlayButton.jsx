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
      className="hover:bg-stone-700 text-sm text-gray-700  px-4 py-2 rounded transition"
       style={{ backgroundColor: "var(--beige-suave)"} }>
      {label}
    </button>
  );
}