import { palette } from "@/lib/palette";
import SliderImagenes from "@/components/SliderImagenes"; // Importamos el slider

export default function ArticleBody({ children, imagenes = [] }) {
  return (
    <article 
      className="prose prose-neutral prose-sans w-full text-text"
      style={{ 
        fontFamily: 'var(--font-body)',
        '--tw-prose-body': 'var(--font-body)'
      }}
    >
      {/* Si vienen imágenes en el array, las renderizamos antes del contenido */}
      {imagenes.length > 0 && <SliderImagenes imagenes={imagenes} />}

      {children}
    </article>
  );
}