import ArticleHeader from "./ArticleHeader";
import ArticleMeta from "./ArticleMeta";
import ArticleBody from "./ArticleBody";

export default function Article({
  title,
  author,
  date,
  readingTime,
  audioUrl, // 👈 NUEVO
  children,
}) {
  return (
    <section className="max-w-5xl p-6 md:p-8 rounded-lg">
      <ArticleHeader title={title} />

      <ArticleMeta
        author={author}
        date={date}
        readingTime={readingTime}
        audioUrl={audioUrl} // 👈 PASARLO
      />

      <ArticleBody>{children}</ArticleBody>
    </section>
  );
}