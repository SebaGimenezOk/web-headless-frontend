import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import I18nProvider from "@/components/I18nProvider";
import { ReproductorProvider } from "@/context/ReproductorContext";
import Player from "@/components/Player";
import Script from "next/script";

export const metadata = {
  title: "Crónicas de un Espectador",
  description: "contenidos y análisis culturales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen overflow-x-hidden bg-neutral-50 text-neutral-900 pb-48">
        <ReproductorProvider>
          <I18nProvider>
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </I18nProvider>
          <Player />
        </ReproductorProvider>

        {/* 👇 1. Cargamos la librería base de Weglot */}
        <Script
          id="weglot-lib"
          src="https://cdn.weglot.com/weglot.min.js"
          strategy="afterInteractive"
        />

        {/* 👇 2. Inicializamos SOLO cuando la librería base terminó de cargar en el navegador */}
        <Script id="weglot-init" strategy="lazyOnload">
          {`
            function initWeglot() {
              if (typeof Weglot !== 'undefined') {
                Weglot.initialize({
                  api_key: 'wg_1caf55c66793a04dfea0cdcaff0251f85'
                });
              } else {
                setTimeout(initWeglot, 100);
              }
            }
            initWeglot();
          `}
        </Script>
      </body>
    </html>
  );
}