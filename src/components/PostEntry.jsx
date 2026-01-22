import { palette } from "@/lib/palette";

export default function PostEntry() {
  return (
    <main
      className="min-h-screen p-12"
      style={{ backgroundColor: palette.background }}
    >
      <article
        className="max-w-3xl mx-auto p-8 rounded-lg"
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
        }}
      >
        <h1
          className="text-3xl mb-2 font-heading"
          style={{ color: palette.textStrong }}
        >
          Crónica de una mirada atenta
        </h1>

        <p
          className="mb-6 font-body"
          style={{ color: palette.text }}
        >
          Por Sebastián Giménez · Enero 2026
        </p>

        <p
          className="leading-relaxed font-body"
          style={{ color: palette.text }}
        >
          El cine, como toda forma de arte, se revela en capas. No se trata
          únicamente de lo que se ve, sino de aquello que persiste cuando la
          pantalla se apaga.
        </p>

        <div
          className="mt-8 p-4"
          style={{ backgroundColor: palette.olive, color: "#ffffff" }}
        >
          Nota editorial destacada
        </div>
      </article>
    </main>
  );
}
