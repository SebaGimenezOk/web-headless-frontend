import Image from "next/image";

export default function PodcastCard({ podcast }) {
  const { title, acf } = podcast;

  if (!acf?.cover_image?.url) return null;

  return (
    <article className="rounded-xl overflow-hidden shadow border">
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={acf.cover_image.url}
          alt={title.rendered}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-1">
        <h2
          className="text-lg font-semibold"
          dangerouslySetInnerHTML={{ __html: title.rendered }}
        />

        <p className="text-sm text-gray-600">
          Autor: {acf.author}
        </p>

        <p className="text-sm text-gray-600">
          Duración: {acf.duration} min
        </p>
      </div>
    </article>
  );
}
