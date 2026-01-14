import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Marca */}
        <Link
          href="/"
          className="text-2xl tracking-tight"
          style={{
            fontFamily: "adobe-garamond-pro, serif",
            color: "var(--foreground)",
          }}
        >
          Crónicas de un Espectador
        </Link>

        {/* Navegación */}
        <div
          className="flex gap-8 text-sm uppercase"
          style={{
            fontFamily: "open-sans-condensed, sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          <Link
            href="/podcasts"
            className="transition-colors"
            style={{ color: "var(--foreground)" }}
          >
            Podcasts
          </Link>
        </div>
      </nav>
    </header>
  );
}
