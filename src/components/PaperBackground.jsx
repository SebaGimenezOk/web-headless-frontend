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
        zIndex: -1, // Lo mandamos atrás de todo el contenido
        pointerEvents: 'none'
      }}>
        <PaperTexture 
          width="100%" 
          height="100%" 
          fit="cover"
          image="/TexturaPapelCanson1.jpg"
          colorBack="#faf9f6"    // Base blanca hueso súper limpia
          colorFront="#ebdcc5"   // Grano en un tono arena ultra suave (chau negro)
          contrast={0.12}        // <-- AL MÍNIMO: Aplana la luz y saca el manchón del medio por completo
          roughness={0.09}       // <-- BAJADO: Grano fino que solo se nota si prestás mucha atención
          ambient={1.0}          // Luz idéntica en toda la pantalla de punta a punta
          diffuse={0.0}
          fiber={0.0}            
          fiberSize={0.0}
          crumples={0.0}         
          crumpleSize={0.0}
          folds={0.0}
          foldCount={0}
        />
      </div>

      {/* Contenedor del contenido que flota limpio arriba */}
      <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}>
        {children}
      </div>
    </div>
  );
}