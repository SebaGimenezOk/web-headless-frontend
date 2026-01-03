"use client";

import PodcastCard from "./PodcastCard";

export default function PodcastList({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {posts
  .filter((post) => post && typeof post === "object")
  .map((post) => (
    <PodcastCard key={post.id} post={post} />
))}

    </div>
  );
}
