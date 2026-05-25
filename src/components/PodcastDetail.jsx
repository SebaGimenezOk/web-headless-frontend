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

      {/* IMG */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-100 object-cover rounded-xl"
        />
      )}

      {/* META */}
      <div className="text-sm text-gray-500 flex flex-wrap gap-2">
        <span>{category}</span>
        <span>• {author}</span>
        {formattedDate && <span>• {formattedDate}</span>}
        {duration && <span>• {duration} min</span>}
      </div>

      {/* AUDIO */}
      {audioUrl && (
        <div className="pt-2">
          <PlayButton url={audioUrl} label="Escuchar entrevista" />
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