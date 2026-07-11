// article body modificado:
import { palette } from "@/lib/palette";

export default function ArticleBody({ children }) {
  return (
    <article 
      className="prose prose-neutral w-full text-text"
      style={{ fontFamily: 'var(--font-body)' }} // Forzamos tu variable nativa de globals.css
    >
      {children}
    </article>
  );
}