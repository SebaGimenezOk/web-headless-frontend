"use client";

import { useReproductor } from "@/context/ReproductorContext";

export default function Player() {
  const { trackUrl } = useReproductor();

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-black border-t border-zinc-800">
      
      {!trackUrl ? (
        <div className="text-white text-sm p-4">
          Ningún audio en reproducción
        </div>
      ) : (
        <iframe
          key={trackUrl}
          width="100%"
          height="120"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=${trackUrl}&color=%23ff5500&auto_play=true`}
        />
      )}
    </div>
  );
}