export default function ArticleHeader({ title }) {
  return (
    <header className="mb-6">
      <h1 className="font-heading text-75xl md:text-4xl leading-tight text-textStrong">
        {title}
      </h1>
    </header>
  );
}
