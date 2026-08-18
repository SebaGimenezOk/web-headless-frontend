import Image from "next/image";

export default function BioContent() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Imagen Horizontal Arriba (Formato apaisado nítido) */}
      <div className="relative w-full aspect-video sm:aspect-21/9 overflow-hidden">
        <Image
          src="/benavides 3.png"
          alt="Foto del Autor"
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      {/* Bloque de Texto Debajo (Casi ancho completo y con tu tipografía) */}
      <div className="w-[95%] px-4 space-y-4 text-justify">
        <p
          style={{ fontFamily: "var(--font-article)" }}
          className="text-lg text-(--text-strong) leading-relaxed"
        >
          Alejandro Domínguez Benavides es un referente de destacada trayectoria
          en el pensamiento académico y la crítica cultural. Doctor y docente en
          el Doctorado en Ciencias Jurídicas de la Pontificia Universidad
          Católica Argentina (UCA), su labor analítica combina el rigor
          conceptual con una profunda devoción por las artes escénicas y
          literarias. Como ensayista y crítico en el diario La Prensa, su firma
          se ha consolidado como un faro de análisis en las disciplinas del
          teatro, la ópera, el ballet, el concierto y la literatura. Con una
          mirada incisiva y una prosa de alta sensibilidad poética, aborda la
          puesta en escena, la interpretación musical y el texto literario no
          solo como hechos estéticos, sino como manifestaciones fundamentales de
          la condición humana, enalteciendo la belleza, la verdad y el valor
          simbólico de la cultura.
        </p>
      </div>
    </div>
  );
}
