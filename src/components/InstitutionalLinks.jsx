import Image from "next/image";
import Link from "next/link";
import institutionalLinks from "@/data/institutionalLinks";

export default function InstitutionalLinks() {
  return (
    <section className="w-full border-y border-[var(--border)] bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--olive)]">
          Instituciones y medios de referencia
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
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
                width={180}
                height={120}
                className="h-14 w-auto opacity-70 transition-all duration-300 hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}