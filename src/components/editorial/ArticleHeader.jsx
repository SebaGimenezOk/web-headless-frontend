export default function ArticleHeader({ title }) {
  return (
    <header className="mb-6">
      <h1 
        className="text-75xl md:text-4xl leading-tight text-textStrong"
        style={{ 
          fontFamily: 'var(--font-heading)',
          fontWeight: 400 //  Forzamos el peso Regular/Fino de Adobe
        }}
      >
        {title}
      </h1>
    </header>
  );
}