/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import PlayButton from "@/components/PlayButton";
import { MapPin } from "lucide-react";

export default function PodcastCard({ post, className = "" }) {
  if (!post || typeof post !== "object") return null;

  const {
    title = "Sin título",
    category = "Sin categoría",
    location = post.ubicacion || post.location || null, 
    imageUrl = null,
    slug = "#",
    audioUrl = null,
  } = post;

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
      {/* LINK */}
      <Link href={`/podcasts/${slug}`}>
        <div className="cursor-pointer">
          {/* IMAGEN */}
          <div className="overflow-hidden rounded-xl mb-3">
            <img
              src={imageUrl || "/placeholder-podcast.jpg"}
              alt={title}
              className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* TÍTULO */}
          <h3 className="text-xl font-heading mb-1 group-hover:text-primary">
            {title}
          </h3>
        </div>
      </Link>

      {/* CATEGORÍA */}
      <div className="text-sm uppercase text-gray-500 mt-1">
        {category}
      </div>

      {/* UBICACIÓN CON ÍCONO */}
      {location && (
        <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{location}</span>
        </div>
      )}

      {/* AUDIO */}
      {audioUrl && (
        <div className="mt-3">
          <PlayButton url={audioUrl} label=" Posee entrevista 🎙️" />
        </div>
      )}
    </article>
  );
}