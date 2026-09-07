import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgramasList from "@/components/ProgramasList"; // <-- Importamos el nuevo módulo
import I18nProvider from "@/components/I18nProvider";
import { ReproductorProvider } from "@/context/ReproductorContext";
import Player from "@/components/Player";
import Script from "next/script";
import PaperBackground from "@/components/PaperBackground"; 
import AlternativaTeatralBanner from "@/components/AlternativaTeatralBanner";

export const metadata = {
  title: "Crónicas de un Espectador",
  icons: {
    icon: "/IsologoPluma.png",
    shortcut: "/IsologoPluma.png",
    apple: "/IsologoPluma.png",
  },
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
              <AlternativaTeatralBanner/>
              <Footer />
            </I18nProvider>
            <Player />
          </ReproductorProvider>
        </PaperBackground>
      </body>
    </html>
  );
}