// article body modificado:
// article body modificado
import { palette } from "@/lib/palette";

export default function ArticleBody({ children }) {
  return (
   
    <article 
      className="prose prose-neutral prose-sans w-full text-text"
      style={{ 
        fontFamily: 'var(--font-body)',
        '--tw-prose-body': 'var(--font-body)' // Esto fuerza a los <p> de prose a usar tu fuente
      }}
    >
      {children}
    </article>
  );
}