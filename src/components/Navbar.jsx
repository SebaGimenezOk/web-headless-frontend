import { palette } from "@/lib/palette";

export default function Navbar() {
  return (
    <nav
      className="flex items-center justify-between px-6 py-4"
      style={{ backgroundColor: palette.olivePale }}
    >
      {/* Marca / título */}
      <span
        className="text-2xl uppercase"
        style={{
          fontFamily: '"adobe-garamond-pro", serif',
          color: palette.textStrong,
        }}
      >
        Crónicas de un Espectador
      </span>

      {/* Navegación */}
      <ul
        className="flex gap-6 uppercase"
        style={{
          fontFamily: '"open-sans-condensed", sans-serif',
          color: palette.textStrong,
        }}
      >
        <li>Inicio</li>
        <li>Podcasts</li>
        <li>Críticas</li>
      </ul>
    </nav>
  );
}
