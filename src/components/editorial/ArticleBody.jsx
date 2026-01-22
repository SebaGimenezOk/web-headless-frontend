import { palette } from "@/lib/palette";

export default function ArticleBody({ children }) {
  return (
    <article className="prose prose-neutral w-full font-body text-text">
      {children}
    </article>
  );
}
