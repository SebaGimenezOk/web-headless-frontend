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
    <nav style={{ backgroundColor: palette.primary }} className="w-full">
      
      {/* TOP BAR */}
       <div className="flex items-center px-4 py-3 md:py-4">

       

        {/* LOGO */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logocronicasv4.png"
              alt="cronicas"
              width={260}
              height={160} 
              className="object-cover"
            />
          </Link>
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center ">

          {/* HAMBURGER */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-6 items-center uppercase text-sm">

            <li><Link href="/">{t("nav.home")}</Link></li>

            {/* TEMPORADAS */}
            <li
              onMouseEnter={() => setActiveDropdown("temporadas")}
              onMouseLeave={() => setActiveDropdown(null)}
              className="relative cursor-pointer"
            >
              {t("nav.seasons")}

              {activeDropdown === "temporadas" && (
                <div className="absolute uppercase  top-full left-0 bg-white text-black shadow-lg p-3 min-w-45 z-50">
                  {temporadas.map((t) => (
                    <Link
                      key={t.id}
                      href={`/temporadas/${t.slug}`}
                      className="block py-1 hover:opacity-60"
                    >    
                      {t.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* CATEGORÍAS */}
            <li
              onMouseEnter={() => setActiveDropdown("categorias")}
              onMouseLeave={() => setActiveDropdown(null)}
              className="relative cursor-pointer"
            >
              Categorías

              {activeDropdown === "categorias" && (
                <div className="absolute top-full left-0 bg-white text-black shadow-lg p-3 min-w-45 z-50">
                  {categorias.map((c) => (
                    <Link
                      key={c.id}
                      href={`/categorias/${c.slug}`}
                      className="block py-1 hover:opacity-60"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li><Link href="/bio">{t("nav.bio")}</Link></li>
            <li><Link href="/search">{t("nav.search")}</Link></li>
            <li><Link href="/contacto">{t("nav.contact")}</Link></li>

            {/* LANG */}
            <li className="flex gap-2">
              <button onClick={() => changeLanguage("es")}>ES</button>
              <button onClick={() => changeLanguage("en")}>EN</button>
            </li>
          </ul>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-3 uppercase">

          <Link href="/">{t("nav.home")}</Link>

          {/* TEMPORADAS */}
          <div>
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "temporadas" ? null : "temporadas"
                )
              }
              className="w-full text-left uppercase"
            >
              {t("nav.seasons")}
            </button>

            {activeDropdown === "temporadas" && (
              <div className="pl-4 mt-2 flex flex-col gap-1">
                {temporadas.map((t) => (
                  <Link key={t.id} href={`/temporadas/${t.slug}`}>
                    {t.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CATEGORÍAS */}
          <div>
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "categorias" ? null : "categorias"
                )
              }
              className="w-full text-left uppercase"
            >
              Categorías
            </button>

            {activeDropdown === "categorias" && (
              <div className="pl-4 mt-2 flex flex-col gap-1">
                {categorias.map((c) => (
                  <Link key={c.id} href={`/categorias/${c.slug}`}>
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/bio">{t("nav.bio")}</Link>
          <Link href="/search">{t("nav.search")}</Link>
          <Link href="/contacto">{t("nav.contact")}</Link>
 
          <div className="flex gap-3 mt-2">
            <button onClick={() => changeLanguage("es")}>ES</button>
            <button onClick={() => changeLanguage("en")}>EN</button>
          </div>
        </div>
      </div>
    </nav>
  );
}