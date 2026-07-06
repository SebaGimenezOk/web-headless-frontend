"use client";

import { PaperTexture } from '@paper-design/shaders-react';

export default function PaperBackground({ children }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      {/* El lienzo interactivo del Shader */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, 
        pointerEvents: 'none' 
      }}>
        <PaperTexture 
          width="100%" 
          height="100%" 

          colorBack="#ffffff" 
          colorFront="#f5f5f5" // Color crema/tinta suave para darle calidez a las fibras del relieve
          contrast={0.12}      // Mantenelo sutil para que no compita con los textos de tus críticas
          roughness={0.15}     // Textura granulada fina táctil
          fiber={0.10}          // Fibras de papel tenues
          fiberSize={0.2}
          crumples={0.05}       // Arrugas de papel muy suavecitas
          crumpleSize={0.3}
          folds={0.0}         // Pliegues casi imperceptibles
          foldCount={0}
          ambient={0.01} // Sombra ambiental ligera para dar profundidad
          diffuse={0.2}          // Mantener la luz difusa para que el papel se vea natural
        />
      </div>

      {/* Tu contenido de la web encima */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}