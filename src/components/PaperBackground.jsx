"use client";

import { PaperTexture } from '@paper-design/shaders-react';

export default function PaperBackground({ children }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      {/* El lienzo del Shader de fondo */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Se queda atrás de todo
        pointerEvents: 'none'
      }}>
        <PaperTexture 
          width="100%" 
          height="100%" 
          fit="cover"
          image="/TexturaPapelCanson1.jpg"
          colorBack="#faf9f6"    // Tu blanco hueso limpio de fondo
          colorFront="#ebdcc5"   // Grano suave
          contrast={0.01}        // Luz ultra plana para sacar el manchón del centro
          roughness={0.06}       // Grano fino y sutil que se nota al acercarse
          fiber={0.0}            
          fiberSize={0.0}
          crumples={0.0}         
          crumpleSize={0.0}
          folds={0.0}
          foldCount={0}
          ambient={1.0}          // Luz uniforme de punta a punta
          diffuse={0.0}
        />
      </div>

      {/* 
        Contenedor del contenido:
        Forzamos por línea que este div y sus hijos directos no tengan fondos sólidos 
        para que dejen traslucir el papel texturizado.
      */}
      <div className="bg-transparent" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}