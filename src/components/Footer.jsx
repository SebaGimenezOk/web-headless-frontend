"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-neutral-900 text-white pb-6">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Columna 1 — Marca */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            {t("footer.brand")}
          </h3>
          <p className="text-sm leading-relaxed text-white/70">
            {t("footer.description")}
          </p>
        </div>

        {/* Columna 2 — Navegación */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
            {t("footer.navigation")}
          </h4>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li><a href="#" className="hover:text-white transition">{t("footer.home")}</a></li>
            <li><a href="#" className="hover:text-white transition">{t("footer.episodes")}</a></li>
            <li><a href="#" className="hover:text-white transition">{t("footer.categories")}</a></li>
            <li><a href="#" className="hover:text-white transition">{t("footer.archive")}</a></li>
          </ul>
        </div>

        {/* Columna 3 — Información */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
            {t("footer.information")}
          </h4>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li><a href="#" className="hover:text-white transition">{t("footer.about")}</a></li>
            <li><a href="#" className="hover:text-white transition">{t("footer.contact")}</a></li>
            <li><a href="#" className="hover:text-white transition">{t("footer.privacy")}</a></li>
            <li><a href="#" className="hover:text-white transition">{t("footer.terms")}</a></li>
          </ul>
        </div>

      </div>

      {/* Barra inferior */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400 gap-2 text-center md:text-left">
          <span>
            © {new Date().getFullYear()} {t("footer.brand")}. {t("footer.rights")}
          </span>
          <span>
            {t("footer.credit")}
          </span>
        </div>
      </div>
    </footer>
  );
}