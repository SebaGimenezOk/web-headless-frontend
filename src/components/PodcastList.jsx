"use client";


import React from "react";
import Image from "next/image";

export default function PodcastList({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => {
        const {
          title,
          author,
          duration,
          content,
          imageUrl,
          image,
          thumbnail
        } = post;

        // Elegimos la primera imagen disponible
        const imgSrc = imageUrl || image || thumbnail || null;

        return (
          <div
            key={index}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={title || "Podcast Image"}
                width={400}
                height={200}
                className="rounded-lg mb-4 object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-1">{title || "Sin título"}</h2>
            {author && <p className="text-sm text-gray-600 mb-1">Autor: {author}</p>}
            {duration && <p className="text-sm text-gray-600 mb-2">Duración: {duration}</p>}
            {content && <p className="text-gray-700">{content}</p>}
          </div>
        );
      })}
    </div>
  );
}
