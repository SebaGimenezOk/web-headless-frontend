"use client";

import { PaperTexture } from "@paper-design/shaders-react";

export default function PaperBackground({ children }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <PaperTexture
          width="100%"
          height="100%"
          colorBack="#faf9f6" 
          colorFront="#f4f4f5" // Grano suave
          contrast={0.03} // <-- CLAVE: Al mínimo para que no haga el manchón gris en el centro
          roughness={0.8} // Grano muy fino y sutil
          fiber={0.1} // Sin fibras
          fiberSize={0.1}
          crumples={0.1} // Sin arrugas (chau manchas rústicas)
          crumpleSize={0.1}
          folds={0.1}
          foldCount={0}
          ambient={1.0} // <-- CLAVE: Luz al máximo y plana en toda la pantalla
          diffuse={0.0} // Sin sombras direccionales
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
