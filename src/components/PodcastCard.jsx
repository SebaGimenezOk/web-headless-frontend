/* eslint-disable @next/next/no-img-element */


import Link from "next/link";

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
    
   <Link href={`/podcasts/${post.slug}`}>
  <article className="
    group
    rounded-2xl 
    border 
    bg-white
    p-4 
    shadow-sm 
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-lg
  ">
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

    <h3 className="text-lg font-semibold mb-1 group-hover:text-indigo-600">
      {title}
    </h3>

    {excerpt && (
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {excerpt}
      </p>
    )}

    <div className="text-xs text-gray-500 flex gap-2">
      <span>{author}</span>
      {duration && <span>• {duration} min</span>}
    </div>
  </article>
</Link>

  );
}
