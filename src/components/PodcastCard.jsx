/* eslint-disable @next/next/no-img-element */

export default function PodcastCard({ post }) {
  if (!post || typeof post !== "object") return null;

  const {
    title = "Sin título",
    excerpt = "",
    author = "Autor desconocido",
    duration = null,
    imageUrl = null,
  } = post;

  return (
    <article className="rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover rounded-lg mb-3"
        />
      ) : (
        <img
          src="/placeholder-podcast.jpg"
          alt="Placeholder podcast"
          className="w-full h-56 object-cover rounded-lg mb-3"
        />
      )}

      <h3 className="text-lg font-semibold mb-1">{title}</h3>

      {excerpt && (
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">
          {excerpt}
        </p>
      )}

      <div className="text-xs text-gray-500 flex gap-2">
        <span>{author}</span>
        {duration && <span>• {duration} min</span>}
      </div>
    </article>
  );
}
