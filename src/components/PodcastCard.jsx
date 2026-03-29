/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import PlayButton from "@/components/PlayButton";

export default function PodcastCard({ post, className = "" }) {
  if (!post || typeof post !== "object") return null;

  const {
    title = "Sin título",
    excerpt = "",
    author = "Autor desconocido",
    duration = null,
    imageUrl = null,
    slug = "#",
    publishedAt = null,
    audioUrl = null,
  } = post;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
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
      {/* Link SOLO en partes clickeables */}
      <Link href={`/podcasts/${slug}`}>
        <div className="cursor-pointer">
          {/* Imagen */}
          <div className="overflow-hidden rounded-xl mb-3">
            <img
              src={imageUrl || "/placeholder-podcast.jpg"}
              alt={title}
              className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Título */}
          <h3 className="text-3xl font-heading mb-1 group-hover:text-primary">
            {title}
          </h3>
        </div>
      </Link>

      {/* Meta */}
      <div className="text-base text-tertiary flex gap-2 mb-2">
        {formattedDate && <span>{formattedDate}</span>}
        <span>• {author}</span>
      </div>

      {/* Extracto */}
      {excerpt && (
        <p className="text-text text-secondary mb-3 line-clamp-3">{excerpt}</p>
      )}

      {/* Duración */}
      {duration && (
        <div className="text-text text-tertiary mb-3">
          Duración: {duration} min
        </div>
      )}

      {/* 🎧 REPRODUCTOR */}
    {audioUrl && (
  <div className="mt-3">
    <PlayButton url={audioUrl} label="▶ Reproducir" />
  </div>
)}
    </article>
  );
}
