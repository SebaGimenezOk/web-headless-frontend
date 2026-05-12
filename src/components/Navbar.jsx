"use client";

<nav
  className="grid grid-cols-3 items-center px-6 py-4"
  style={{ backgroundColor: palette.primary }}
>
  {/* Izquierda (placeholder) */}
  <div></div>

  {/* Logo centrado */}
  <div className="flex justify-center">
    <Image
      src="/Logo Cronicas v4.png"
      alt="cronicas"
      width={200}
      height={150}
      className="object-contain"
    />
  </div>

  {/* Navegación derecha */}
  <ul
    className="flex gap-6 uppercase items-center justify-end"
    style={{
      fontFamily: '"open-sans-condensed", sans-serif',
      color: palette.textStrong,
    }}
  >
    <li>{t("nav.home")}</li>
    <li>{t("nav.seasons")}</li>
    <li>{t("nav.bio")}</li>
    <li>{t("nav.search")}</li>
    <li>{t("nav.contact")}</li>

    <li className="flex gap-2 ml-4">
      <button onClick={() => changeLanguage("es")}>ES</button>
      <button onClick={() => changeLanguage("en")}>EN</button>
    </li>
  </ul>
</nav>