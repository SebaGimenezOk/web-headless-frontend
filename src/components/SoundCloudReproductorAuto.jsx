'use client';

import { useState, useEffect } from "react";
import SoundCloudReproductorFull from "./Reproductor";


const SOUND_USERNAME = "sebastian-gimenez-979313261";

export default function SoundCloudReproductorAuto() {
  const [userId, setUserId] = useState(null);
  const CLIENT_ID = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch(
          `https://api.soundcloud.com/resolve?url=https://soundcloud.com/${SOUND_USERNAME}&client_id=${CLIENT_ID}`
        );
        const data = await res.json();
        setUserId(data.id);
      } catch (err) {
        console.error("Error resolviendo userId:", err);
      }
    };

    fetchUserId();
  }, [CLIENT_ID]);

  if (!userId) return <p className="text-white p-4">Cargando usuario...</p>;

  return <SoundCloudReproductorFull userId={userId} />;
}