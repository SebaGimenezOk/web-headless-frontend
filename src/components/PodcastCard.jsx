/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function PodcastCard({ post, className = "" }) {
console.log("CARD POST:", post);

  if (!post || typeof post !== "object") return null;

  const {
    title = "Sin título",
    excerpt = "",
    author = "Autor desconocido",
    duration = null,
    imageUrl = null,
    slug = "#",
    publishedAt = null, // fecha de publicación
  } = post;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Link href={`/podcasts/${slug}`}>
      <article
        className={`
          group
          rounded-2xl
          
          bg-white
          p-4
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
          ${className}
        `}
      >
        {/* Imagen Destacada */}
        <div className="overflow-hidden rounded-xl mb-3">
          <img
            src={imageUrl || "/placeholder-podcast.jpg"}
            alt={title}
            className="
              h-56
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </div>

        {/* Título */}
        <h3 className="text-3xl font-heading mb-1 group-hover:text-primary">
           {title}
        </h3>

        {/* Meta: Fecha y autor */}
        <div className="text-base text-tertiary flex gap-2 mb-2">
          {formattedDate && <span>{formattedDate}</span>}
          <span>• {author}</span>
        </div>

        {/* Extracto */}
        {excerpt && (
          <p className="text-text text-secondary mb-3 line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Duración (si aplica) */}
        {duration && (
          <div className="text-text text-tertiary">
            Duración: {duration} min
          </div>
        )}
      </article>
    </Link>
  );
}
