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
        <p className="text-xs font-medium text-(--text-strong) leading-relaxed">
          Alejandro Domínguez Benavides es un referente de destacada trayectoria
          en el pensamiento académico, la docencia universitaria y el análisis
          crítico de la cultura. Doctor y docente en el Doctorado en Ciencias
          Jurídicas de la Pontificia Universidad Católica Argentina (UCA), su
          perspectiva combina el rigor conceptual e institucional con una
          profunda agudeza estética e intelectual. Como columnista y ensayista
          en el diario La Prensa, su firma se ha consolidado en el ámbito de la
          crítica cultural y de arte, abordando con mirada incisiva las
          expresiones plásticas, el patrimonio simbólico y las dinámicas
          artísticas contemporáneas. Su labor crítica destaca por enaltecer la
          belleza, la verdad y el valor ético del arte, tendiendo puentes entre
          la filosofía, el derecho, la historia y la sensibilidad poética. Su
          perfil académico e intelectual lo posiciona como un observador lúcido
          de la cultura, cuya prosa lúcida y compromiso con la divulgación
          enriquecen el debate estético e institucional de la región.
        </p>
      </div>
    </div>
  );
}
