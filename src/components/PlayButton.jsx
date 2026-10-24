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
      className="inline-flex cursor-pointer items-center justify-center gap-2 w-full py-2 px-4 rounded-lg font-medium text-xs uppercase tracking-wider transition-all duration-200 border"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--text-strong)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--ocre)";
        e.currentTarget.style.color = "var(--ocre)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text-strong)";
      }}
    >
      {label}
    </button>
  );
}