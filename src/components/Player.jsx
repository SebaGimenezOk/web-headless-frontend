// "use client";

// import { useReproductor } from "@/context/ReproductorContext";

// export default function Player() {
//   const { trackUrl } = useReproductor();

//   return (
//     <div className="fixed bottom-0 left-0 w-full z-50">

//       {!trackUrl ? (
//         <div className="text-white text-sm p-4">
//           Ningún audio en reproducción
//         </div>
//       ) : (
//         <iframe
//           key={trackUrl}
//           width="100%"
//           height="120"
//           allow="autoplay"
//           src={`https://w.soundcloud.com/player/?url=${trackUrl}&color=%23ff5500&auto_play=true`}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useReproductor } from "@/context/ReproductorContext";

export default function Player() {
  const { trackUrl } = useReproductor();

  const iframeRef = useRef(null);
  const widgetRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [artwork, setArtwork] = useState("");
  const [volume, setVolume] = useState(50);

  // cargar SDK
  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (window.SC) return;

    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // init widget
  useEffect(() => {
    if (!trackUrl || !iframeRef.current || !window.SC) return;

    const widget = window.SC.Widget(iframeRef.current);
    widgetRef.current = widget;

    widget.bind(window.SC.Widget.Events.READY, () => {
      widget.getCurrentSound((sound) => {
        setTitle(sound.title);
        setArtist(sound.user?.username || "");
        setArtwork(sound.artwork_url || "");
      });
      widget.getDuration((d) => {
        if (d) setDuration(d);
      });

      widget.getDuration((d) => setDuration(d));
    });

    widget.bind(window.SC.Widget.Events.PLAY, () => setIsPlaying(true));
    widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));

    widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (e) => {
      if (e.duration) setDuration(e.duration);
      setCurrent(e.currentPosition);
    });
  }, [trackUrl]);

  // play / pause
  const togglePlay = () => {
    if (!widgetRef.current) return;

    widgetRef.current.isPaused((paused) => {
      paused ? widgetRef.current.play() : widgetRef.current.pause();
    });
  };
  //  seek manual
  const handleSeek = (e) => {
    if (!widgetRef.current || !duration) return;

    const percent = Number(e.target.value);

    // 👉 convertir % → ms correctamente
    const newTime = (percent / 100) * duration;

    widgetRef.current.seekTo(newTime);
  };

  const formatTime = (ms) => {
    if (!ms || isNaN(ms)) return "0:00";

    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow z-50">
      {!trackUrl ? (
        <div className="h-16 flex items-center px-4 text-gray-500 text-sm">
          Ningún audio en reproducción
        </div>
      ) : (
        <>
          <div className="h-20 flex items-center px-4 gap-4">
            {/* 🎵 Miniatura */}
            {artwork && (
              <img
                src={artwork}
                alt="cover"
                className="w-14 h-14 rounded object-cover"
              />
            )}

            {/* 🎛 CONTROLES */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => widgetRef.current.seekTo(0)}
                className="text-gray-600 hover:text-black transition"
              >
                ⏮
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition flex items-center justify-center"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              <button
                onClick={() => widgetRef.current.seekTo(current + 10000)}
                className="text-gray-600 hover:text-black transition"
              >
                ⏭
              </button>
            </div>

            {/* 🎧 INFO + PROGRESS */}
            <div className="flex-1">
              <p className="text-sm font-semibold truncate text-gray-800">
                {title || "Cargando..."}
              </p>

              <p className="text-xs text-gray-500 truncate">{artist}</p>

              {/* 🎚 BARRA PRO */}
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={duration ? (current / duration) * 100 : 0}
                onInput={handleSeek}
                className="w-full accent-orange-500 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>{formatTime(current)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* 🔊 VOLUMEN */}
            <div className="flex items-center gap-2 w-32">
              <span className="text-gray-500">🔊</span>

              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          </div>

          {/* 🎵 IFRAME OCULTO */}
          <iframe
            ref={iframeRef}
            key={trackUrl}
            width="100%"
            height="0"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${trackUrl}&auto_play=true&visual=false`}
          />
        </>
      )}
    </div>
  );
}
