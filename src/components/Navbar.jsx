"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { palette } from "@/lib/palette";

import {
  getTemporadas,
  getCategorias,
} from "@/services/taxonomies";

export default function Navbar() {
  const { t } = useTranslation();

  const [temporadas, setTemporadas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

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
    <nav
      className="px-6 py-4"
      style={{ backgroundColor: palette.primary }}
    >
      {/* DESKTOP */}
      <div className="grid grid-cols-3 items-center">
        {/* izquierda */}
        <div />

        {/* logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/logocronicasv4.png"
              alt="cronicas"
              width={200}
              height={150}
              className="object-contain"
            />
          </Link>
        </div>

        {/* derecha desktop */}
        <div className="hidden md:flex justify-end">
          <ul
            className="flex gap-6 uppercase items-center"
            style={{
              fontFamily: '"open-sans-condensed", sans-serif',
              color: palette.textStrong,
            }}
          >
            <li><Link href="/">{t("nav.home")}</Link></li>

            {/* TEMPORADAS */}
            <li
              className="relative"
              onMouseEnter={() => setOpenDropdown("temporadas")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className="cursor-pointer">
                {t("nav.seasons")}
              </span>

              {openDropdown === "temporadas" && (
                <div className="absolute top-full left-0 bg-white text-black shadow-md p-2 min-w-40 z-50">
                  {temporadas.map((t) => (
                    <Link
                      key={t.id}
                      href={`/temporadas/${t.slug}`}
                      className="block px-2 py-1 hover:bg-gray-100"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* CATEGORÍAS */}
            <li
              className="relative"
              onMouseEnter={() => setOpenDropdown("categorias")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className="cursor-pointer">
                Categorías
              </span>

              {openDropdown === "categorias" && (
                <div className="absolute top-full left-0 bg-white text-black shadow-md p-2 min-w-40 z-50">
                  {categorias.map((c) => (
                    <Link
                      key={c.id}
                      href={`/categorias/${c.slug}`}
                      className="block px-2 py-1 hover:bg-gray-100"
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
            <li className="flex gap-2 ml-4">
              <button onClick={() => changeLanguage("es")}>ES</button>
              <button onClick={() => changeLanguage("en")}>EN</button>
            </li>
          </ul>
        </div>

        {/* MOBILE BUTTON */}
        <div className="md:hidden flex justify-end">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <Link href="/">{t("nav.home")}</Link>

          <details>
            <summary>{t("nav.seasons")}</summary>
            <div className="pl-4">
              {temporadas.map((t) => (
                <Link
                  key={t.id}
                  href={`/temporadas/${t.slug}`}
                  className="block py-1"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </details>

          <details>
            <summary>Categorías</summary>
            <div className="pl-4">
              {categorias.map((c) => (
                <Link
                  key={c.id}
                  href={`/categorias/${c.slug}`}
                  className="block py-1"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </details>

          <Link href="/bio">{t("nav.bio")}</Link>
          <Link href="/search">{t("nav.search")}</Link>
          <Link href="/contacto">{t("nav.contact")}</Link>
        </div>
      )}
    </nav>
  );
}