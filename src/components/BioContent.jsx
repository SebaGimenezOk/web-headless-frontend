import Image from "next/image";

export default function BioContent() {
  return (
    <div className="prose prose-stone mx-auto text-neutral-800 space-y-6 leading-relaxed text-justify flex flex-col sm:flex-row items-stretch gap-6">
      {/* Bloque de Texto Original */}
      <div className="flex-1 space-y-6">
        <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-neutral-950">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam
          id lorem tincidunt consequat. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat.
        </p>
        <p>
          Morbi eget efficitur turpis. Praesent ut accumsan nisi. Mauris feugiat
          lacus in lectus viverra, quis convallis magna erat volutpat. Cras
          elementum, velit id varius interdum, dui felis vulputate felis, vitae
          sodales lorem nisl id turpis.
        </p>
      </div>

      {/* Imagen un 20% más grande con Corte Diagonal y Desvanecido Gaussiano/Difuso */}
      <div
        className="relative w-full h-56 sm:w-77 sm:h-auto shrink-0 overflow-hidden bg-white"
        style={{
          // Mantenemos el clipPath para definir el límite físico del polígono diagonal
          clipPath: "polygon(calc(0% + 100px) 0%, 100% 0%, 100% 100%, 0% 100%)",

          WebkitMaskImage:
            "linear-gradient(110deg, transparent 0px, rgba(0, 0, 0, 0.05) 30px, rgba(0, 0, 0, 0.4) 90px, black 160px)",
          maskImage:
            "linear-gradient(110deg, transparent 0px, rgba(0, 0, 0, 0.05) 30px, rgba(0, 0, 0, 0.4) 90px, black 160px)",
        }}
      >
        <Image
          src="/benavides 3.png"
          alt="Foto del Autor"
          fill
          sizes="(max-width: 768px) 100vw, 308px"
          className="object-cover m-0"
          style={{
            filter: "drop-shadow(-5px 0px 10px rgba(255,255,255,0.8))",
          }}
          priority
        />
      </div>
    </div>
  );
}
