"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import PodcastCard from "@/components/PodcastCard";

export default function HomeContent({ podcasts }) {
  const { t } = useTranslation();

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      <section className="pt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl uppercase font-semibold">
            {t("home.recentEpisodes")}
          </h2>

          <Link
            href="/podcasts"
            className="text-sm text-gray-500 hover:text-indigo-600"
          >
            {t("home.viewAll")}
          </Link>
        </div>

        {podcasts.length === 0 ? (
          <p className="text-gray-500 italic">
            {t("home.noPodcasts")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} post={podcast} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}