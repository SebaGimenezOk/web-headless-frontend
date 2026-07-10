import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgramasList from "@/components/ProgramasList"; // <-- Importamos el nuevo módulo
import I18nProvider from "@/components/I18nProvider";
import { ReproductorProvider } from "@/context/ReproductorContext";
import Player from "@/components/Player";
import Script from "next/script";
import PaperBackground from "@/components/PaperBackground"; 

export const metadata = {
  title: "Crónicas de un Espectador",
  description: "contenidos y análisis culturales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
   
      <body className="flex flex-col min-h-screen bg-background text-text">
        
        {/* 3. Envolvemos todo el contenido visual con el fondo Canson */}
        <PaperBackground>
          <ReproductorProvider>
            <I18nProvider>
              <Navbar />
              <main className="relative grow">{children}</main>
              
              {/* 🔥 Colocamos el listado acá: mantiene la textura y se renderiza en todas las páginas antes del footer */}
              <ProgramasList /> 
              
              <Footer />
            </I18nProvider>
            <Player />
          </ReproductorProvider>
        </PaperBackground>

        {/* 1. librería base de Weglot */}
        <Script
          id="weglot-lib"
          src="https://cdn.weglot.com/weglot.min.js"
          strategy="afterInteractive"
        />

        {/* 2. Inicializa forma segura como texto plano */}
        <Script id="weglot-init" strategy="afterInteractive">
          {`
            (function() {
              function checkWeglot() {
                if (typeof Weglot !== 'undefined') {
                  Weglot.initialize({
                    api_key: 'wg_1caf55c66793a04dfea0cdcaff0251f85',
                    dynamic: 'body'
                  });
                } else {
                  setTimeout(checkWeglot, 50);
                }
              }
              checkWeglot();
            })();
          `}
        </Script>
       
      </body>
    </html>
  );
}