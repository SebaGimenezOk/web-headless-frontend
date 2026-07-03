"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { palette } from "@/lib/palette";
import { getTemporadas, getCategorias } from "@/services/taxonomies";

export default function Navbar() {
  const { t } = useTranslation();

  const [temporadas, setTemporadas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    async function load() {
      const temps = await getTemporadas();
      const cats = await getCategorias();
      setTemporadas(temps);
      setCategorias(cats);
    }
    load();
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <nav style={{ backgroundColor: palette.primary }} className="w-full border-b border-black/5 select-none">
      
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (Grid de doble fila) */}
      {/* ========================================================================= */}
      <div className="hidden md:grid grid-cols-3 items-center px-8 pt-6 pb-4 max-w-7xl mx-auto">
        
        {/* FILA 1 - IZQUIERDA: Espacio libre o secundario para equilibrar el peso visual hacia la derecha */}
        <div className="flex items-center">
          {/* Queda libre, empujando la atención hacia el centro y la derecha */}
        </div>

        {/* FILA 1 - CENTRO: Isologo (Pluma / Ícono) */}
        <div className="flex justify-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/branding/IsologoPluma.png"
              alt="cronicas-isologo"
              width={70} 
              height={70}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* FILA 1 - DERECHA: Toda la navegación principal y secundaria consolidada a la derecha */}
        <ul className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-end uppercase text-xs tracking-wider font-medium text-[var(--text-strong)]">
          
          {/* Portada */}
          <li className="hover:opacity-60 transition-opacity">
            <Link href="/">{t("nav.home")}</Link>
          </li>

          {/* DROP DOWN TEMPORADAS */}
          <li
            onMouseEnter={() => setActiveDropdown("temporadas")}
            onMouseLeave={() => setActiveDropdown(null)}
            className="relative cursor-pointer py-2"
          >
            <span className="flex items-center gap-1">
              {t("nav.seasons")}
              <span className="text-[10px] opacity-60">▼</span>
            </span>

            {activeDropdown === "temporadas" && (
              <div className="absolute top-full right-0 bg-white text-[var(--text-strong)] shadow-xl p-4 min-w-[200px] z-50 border border-[var(--border)] rounded flex flex-col gap-2 normal-case tracking-normal animate-fadeIn">
                {temporadas.map((t) => (
                  <Link
                    key={t.id}
                    href={`/temporadas/${t.slug}`}
                    className="block py-1 px-2 hover:bg-[var(--background)] rounded transition-colors text-sm"
                  >    
                    {t.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          {/* DROP DOWN CATEGORÍAS */}
          <li
            onMouseEnter={() => setActiveDropdown("categorias")}
            onMouseLeave={() => setActiveDropdown(null)}
            className="relative cursor-pointer py-2"
          >
            <span className="flex items-center gap-1">
              Categorías
              <span className="text-[10px] opacity-60">▼</span>
            </span>

            {activeDropdown === "categorias" && (
              <div className="absolute top-full right-0 bg-white text-[var(--text-strong)] shadow-xl p-4 min-w-[200px] z-50 border border-[var(--border)] rounded flex flex-col gap-2 normal-case tracking-normal animate-fadeIn">
                {categorias.map((c) => (
                  <Link
                    key={c.id}
                    href={`/categorias/${c.slug}`}
                    className="block py-1 px-2 hover:bg-[var(--background)] rounded transition-colors text-sm"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          {/* Enlaces Secundarios Originales de la Derecha */}
          <li className="hover:opacity-60 transition-opacity"><Link href="/bio">{t("nav.bio")}</Link></li>
          <li className="hover:opacity-60 transition-opacity"><Link href="/search">{t("nav.search")}</Link></li>
          <li className="hover:opacity-60 transition-opacity"><Link href="/contacto">{t("nav.contact")}</Link></li>

          {/* LANG TOGGLE */}
          <li className="flex gap-2 items-center pl-2 border-l border-[var(--border)] text-[11px]">
            <button 
              onClick={() => changeLanguage("es")} 
              className={`hover:text-black font-bold ${i18n.language === "es" ? "text-[var(--text-strong)] underline decoration-2 underline-offset-4" : "text-[var(--text)]"}`}
            >
              ES
            </button>
            <span className="text-[var(--border)]">|</span>
            <button 
              onClick={() => changeLanguage("en")} 
              className={`hover:text-black font-bold ${i18n.language === "en" ? "text-[var(--text-strong)] underline decoration-2 underline-offset-4" : "text-[var(--text)]"}`}
            >
              EN
            </button>
          </li>
        </ul>

        {/* FILA 2 - CENTRO COMPLETO: Nombre/Logotipo Editorial Centrado */}
        <div className="col-span-3 text-center mt-6 mb-2">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <h1 
              style={{ fontFamily: 'var(--font-heading)' }} 
              className="text-3xl md:text-3xl tracking-widest uppercase text-[var(--text-strong)] font-normal"
            >
              Crónicas de un Espectador
            </h1>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT */}
      {/* ========================================================================= */}
      <div className="md:hidden flex items-center justify-between px-4 py-4">
        
        {/* Mobile Brand */}
        <Link href="/" className="flex flex-col">
          <span style={{ fontFamily: 'var(--font-heading)' }} className="text-lg uppercase tracking-wider text-[var(--text-strong)] font-bold leading-tight">
            Crónicas de
          </span>
          <span style={{ fontFamily: 'var(--font-heading)' }} className="text-sm uppercase tracking-widest text-[var(--text-strong)] font-normal">
            un Espectador
          </span>
        </Link>

        {/* Hamburger Button */}
        <button
          className="text-2xl p-2 text-[var(--text-strong)] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-6 pt-2 flex flex-col gap-4 uppercase text-sm font-medium tracking-wide text-[var(--text-strong)] border-t border-black/5 bg-white/50 backdrop-blur-sm">

          <Link href="/" onClick={() => setMenuOpen(false)} className="py-1 border-b border-black/5">{t("nav.home")}</Link>

          {/* Mobile Temporadas */}
          <div className="py-1 border-b border-black/5">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "temporadas" ? null : "temporadas")}
              className="w-full flex justify-between items-center uppercase"
            >
              <span>{t("nav.seasons")}</span>
              <span className="text-xs">{activeDropdown === "temporadas" ? "▲" : "▼"}</span>
            </button>

            {activeDropdown === "temporadas" && (
              <div className="pl-4 mt-2 flex flex-col gap-2 normal-case tracking-normal text-[var(--text)] bg-black/5 p-2 rounded">
                {temporadas.map((t) => (
                  <Link key={t.id} href={`/temporadas/${t.slug}`} onClick={() => setMenuOpen(false)} className="py-1 block">
                    {t.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Categorías */}
          <div className="py-1 border-b border-black/5">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "categorias" ? null : "categorias")}
              className="w-full flex justify-between items-center uppercase"
            >
              <span>Categorías</span>
              <span className="text-xs">{activeDropdown === "categorias" ? "▲" : "▼"}</span>
            </button>

            {activeDropdown === "categorias" && (
              <div className="pl-4 mt-2 flex flex-col gap-2 normal-case tracking-normal text-[var(--text)] bg-black/5 p-2 rounded">
                {categorias.map((c) => (
                  <Link key={c.id} href={`/categorias/${c.slug}`} onClick={() => setMenuOpen(false)} className="py-1 block">
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/bio" onClick={() => setMenuOpen(false)} className="py-1 border-b border-black/5">{t("nav.bio")}</Link>
          <Link href="/search" onClick={() => setMenuOpen(false)} className="py-1 border-b border-black/5">{t("nav.search")}</Link>
          <Link href="/contacto" onClick={() => setMenuOpen(false)} className="py-1 border-b border-black/5">{t("nav.contact")}</Link>
 
          {/* Mobile Selector Idioma */}
          <div className="flex gap-4 mt-2 justify-center text-xs tracking-widest bg-black/5 py-2 rounded">
            <button 
              onClick={() => { changeLanguage("es"); setMenuOpen(false); }}
              className={i18n.language === "es" ? "font-bold underline underline-offset-4" : "opacity-60"}
            >
              ESPAÑOL
            </button>
            <span className="opacity-30">|</span>
            <button 
              onClick={() => { changeLanguage("en"); setMenuOpen(false); }}
              className={i18n.language === "en" ? "font-bold underline underline-offset-4" : "opacity-60"}
            >
              ENGLISH
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}