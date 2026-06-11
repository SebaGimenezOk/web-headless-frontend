"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReproductor } from "@/context/ReproductorContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

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

  // 🎧 Cargar SDK
  useEffect(() => {
    if (window.SC) return;

    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 🔊 Volumen
  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.setVolume(volume);
    }
  }, [volume]);

  // 🎛 Inicializar widget
  useEffect(() => {
    if (!trackUrl) return;

    const init = () => {
      if (!iframeRef.current) {
        setTimeout(init, 100);
        return;
      }

      const waitForSC = () => {
        if (!window.SC) {
          setTimeout(waitForSC, 200);
          return;
        }

        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;

        widget.bind(window.SC.Widget.Events.READY, () => {
          widget.getCurrentSound((sound) => {
            setTitle(sound?.title || "");
            setArtist(sound?.user?.username || "");
            setArtwork(sound?.artwork_url || "");
          });

          widget.getDuration((d) => {
            if (d) setDuration(d);
          });
        });

        widget.bind(window.SC.Widget.Events.PLAY, () => setIsPlaying(true));
        widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));

        widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (e) => {
          if (e.duration) setDuration(e.duration);
          setCurrent(e.currentPosition);
        });
      };

      waitForSC();
    };

    init();
  }, [trackUrl]);

  const togglePlay = () => {
    if (!widgetRef.current) return;

    widgetRef.current.isPaused((paused) => {
      paused ? widgetRef.current.play() : widgetRef.current.pause();
    });
  };

  const handleSeek = (e) => {
    if (!widgetRef.current || !duration) return;

    const percent = Number(e.target.value);
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

  if (!trackUrl) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-(--border) bg-(--surface) shadow">
      <div className="flex h-20 items-center gap-4 px-4">
        {/* Artwork */}
        {artwork && (
          <Image
            src={artwork}
            alt={title || "Portada del audio"}
            width={56}
            height={56}
            className="h-14 w-14 rounded object-cover"
            unoptimized
          />
        )}

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => widgetRef.current?.seekTo(0)}
            className="text-gray-500 transition-colors hover:text-(--olive)"
          >
            <SkipBack size={18} />
          </button>

          <button
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-(--olive) text-white transition-opacity hover:opacity-90"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            onClick={() => widgetRef.current?.seekTo(current + 10000)}
            className="text-gray-500 transition-colors hover:text-(--olive)"
          >
            <SkipForward size={18} />
          </button>
        </div>

        {/* Info + Progress */}
        <div className="flex-1">
          <p className="truncate text-sm font-semibold text-(--text-strong)">
            {title || "Cargando..."}
          </p>

          <p className="truncate text-xs text-(--olive)">
            {artist}
          </p>

          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={duration ? (current / duration) * 100 : 0}
            onInput={handleSeek}
            className="mt-1 h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-(--olive)"
          />

          <div className="mt-1 flex justify-between text-[11px] text-(--text)">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex w-32 items-center gap-2 text-(--olive)">
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full cursor-pointer accent-(--olive)"
          />
        </div>
      </div>

      {/* Hidden iframe */}
      <iframe
        ref={iframeRef}
        key={trackUrl}
        width="100%"
        height="0"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
          trackUrl
        )}&auto_play=true&visual=false`}
      />
    </div>
  );
}