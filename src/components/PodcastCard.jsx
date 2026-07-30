/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import PlayButton from "@/components/PlayButton";
import { MapPin, Ticket } from "lucide-react";

export default function PodcastCard({ post, className = "" }) {
  if (!post || typeof post !== "object") return null;

  // Extraemos todos los datos, incluyendo temporada y los nuevos links de ACF
  const {
    title = "Sin título",
    category = "Sin categoría",
    season = post.season || post.temporada || post.acf?.temporada || null,
    location = post.ubicacion || post.location || post.acf?.ubicacion || post.acf?.teatro || null, 
    imageUrl = null,
    slug = "#",
    audioUrl = post.audioUrl || post.audio_url || post.acf?.audio_url || post.acf?.audio || null,
    plateanetUrl = post.plateanetUrl || post.plateanet || post.acf?.plateanet || null,
    alternativaUrl = post.alternativaUrl || post.alternativa_teatral || post.acf?.alternativa_teatral || post.acf?.alternativa || null,
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
        flex
        flex-col
        justify-between
        ${className}
      `}
    >
      <div>
        {/* LINK A LA PUBLICACIÓN */}
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

        {/* CATEGORÍA Y TEMPORADA */}
        <div className="flex items-center gap-2 text-sm uppercase text-gray-500 mt-1 flex-wrap">
          <span>{category}</span>
          {season && (
            <>
              <span>•</span>
              <span className="font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded text-xs">
                {season}
              </span>
            </>
          )}
        </div>

        {/* UBICACIÓN CON ÍCONO */}
        {location && (
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span>{location}</span>
          </div>
        )}
      </div>

      {/* REPRODUCTOR DE AUDIO O BOTONES DE ENTRADAS */}
      <div className="mt-4 pt-2">
        {audioUrl ? (
          /* OPCIÓN 1: SI HAY AUDIO */
          <PlayButton url={audioUrl} label=" Posee entrevista 🎙️" />
        ) : plateanetUrl || alternativaUrl ? (
          /* OPCIÓN 2: SI NO HAY AUDIO, MOSTRAMOS BOTONES DE ENTRADAS */
          <div className="flex flex-col gap-2 mt-2">
            {plateanetUrl && (
              <a
                href={plateanetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 bg-black text-white text-center text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors rounded-xl font-medium"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Plateanet</span>
              </a>
            )}

            {alternativaUrl && (
              <a
                href={alternativaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 border border-black text-black text-center text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors rounded-xl font-medium"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Alternativa Teatral</span>
              </a>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}