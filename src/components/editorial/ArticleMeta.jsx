export default function ArticleMeta({ author, date, readingTime }) {
  return (
    <div className="mb-8 text-sm text-text flex flex-wrap gap-x-3 gap-y-1">
      <span>{author}</span>
      <span> •</span>
      <time>{date}</time>
      <span> • </span>
      <span>{readingTime} min</span>
    </div>
  );
}
