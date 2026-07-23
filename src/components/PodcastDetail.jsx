"use client";

import PlayButton from "@/components/PlayButton";
import Image from "next/image";

export default function PodcastDetail({ post }) {
  if (!post) return null;

  const {
    title,
    content,
    imageUrl,
    author,
    category,
    publishedAt,
    duration,
    audioUrl,
  } = post;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 space-y-6">

      {/* TÍTULO */}
      <h1 className="text-3xl md:text-4xl font-bold uppercase">
        {title}
      </h1>

      {/* AUTOR Y FECHA DE EMISIÓN */}
      <div className="text-sm text-gray-600 font-medium">
        {formattedDate && <span>{formattedDate}</span>}
        {formattedDate && author && <span> | </span>}
        {author && <span>autor: {author}</span>}
      </div>

      {/* IMG */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-auto max-h-[500px] object-cover rounded-xl"
        />
      )}

      {/* META SECUNDARIA / AUDIO */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {category && <span className="bg-neutral-100 px-3 py-1 rounded-full">{category}</span>}
        {duration && <span>• {duration} min</span>}
      </div>

      {audioUrl && (
        <div className="pt-2">
          <PlayButton url={audioUrl} label="Posee Entrevista 🎧" />
        </div>
      )}

      {/* CONTENIDO */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}