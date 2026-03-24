"use client";

import { createContext, useContext, useState } from "react";

const ReproductorContext = createContext();

export const useReproductor = () => useContext(ReproductorContext);

export const ReproductorProvider = ({ children }) => {
  const [trackUrl, setTrackUrl] = useState(null);

  const playTrack = (url) => {
    setTrackUrl(url);
  };

  return (
    <ReproductorContext.Provider value={{ trackUrl, playTrack }}>
      {children}
    </ReproductorContext.Provider>
  );
};