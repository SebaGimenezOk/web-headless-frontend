import Image from "next/image";
import Link from "next/link";
import institutionalLinks from "@/data/institutionalLinks";

export default function InstitutionalLinks() {
  return (
    <section className="w-full border-y border-(--border) bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-3 text-center  font-semibold uppercase tracking-[0.3em] text-(--olive)">
          Instituciones y medios de referencia
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-x-24 gap-y-12">
          {institutionalLinks.map((site) => (
            <Link
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={site.name}
              className="transition-all duration-300 hover:scale-105"
            >
              <Image
                src={site.logo}
                alt={site.name}
                width={360}
                height={140}
                className="h-28 w-auto opacity-85 transition-all duration-300 hover:opacity-100 hover:-translate-y-1"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}