// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Crónicas de un Espectador",
  description: "contenidos y análisis culturales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/yha3lnr.css" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-neutral-50 text-neutral-900">
        <Navbar />

        <main className="relative">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
