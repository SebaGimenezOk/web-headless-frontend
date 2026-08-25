import { palette } from "@/lib/palette";
import SliderImagenes from "@/components/SliderImagenes";

export default function ArticleBody({ children, imagenes = [] }) {
  return (
    <article 
      className="prose prose-neutral prose-sans w-full text-text"
      style={{ 
        fontFamily: 'var(--font-body)',
        '--tw-prose-body': 'var(--font-body)'
      }}
    >
      {/* 📸 Slider opcional si existen fotos */}
      {imagenes.length > 0 && <SliderImagenes imagenes={imagenes} />}

      {children}
    </article>
  );
}