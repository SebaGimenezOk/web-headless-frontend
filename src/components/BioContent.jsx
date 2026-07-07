import Image from "next/image";

export default function BioContent() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-8">
      {/* Bloque de Texto */}
      <div className="w-full sm:flex-1 prose prose-stone text-neutral-800 space-y-6 leading-relaxed text-justify">
        <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-neutral-950">
          Alejandro Javaloyas (b. 1987, Palma de Mallorca, Spain) is a
          multidisciplinary visual artist based in Toulouse, France. From the
          age of six to eighteen, he received extensive academic training in
          drawing and painting under Majorcan classical painters Ernest, Malena
          Tous, and Antonia Oliver. He later pursued filmmaking, earning both a
          BA and an MA (Summa Cum Laude) from the ESCAC Barcelona Film School at
          the University of Barcelona. In 2022, he further developed his
          painting practice through the Turps Correspondence Mentorship Course
          at Turps Art School in London, UK. His practice unfolds through
          research-driven projects that move across figurative drawing and
          painting, expanded painting, and experimental photography. In his
          figurative drawings in colored pencil and oil paintings, the human
          body, symbolic objects, and ritual gestures appear within sparse
          compositions, addressing themes of fragility, violence, and
          transcendence. In his expanded paintings, Javaloyas reimagines the
          conventional picture plane by transforming veneered plywood through
          hot-press bending, cutting, drilling, and polishing, creating curved
          supports that resemble fragments of an incomplete circumference.
          Circular motifs—dots, spheres, ellipses, holes, and gradients—recur
          throughout these works, exploring the tension between form and figure,
          object and wall, and presence and absence. In parallel, his
          experimental photographic projects investigate processes of aging,
          decay, and disappearance, often pushing the limits of scale, duration,
          and perception. Across these different mediums, his work maintains a
          restrained and atmospheric visual language and a sustained inquiry
          into time, transformation, and mortality. Javaloyas has exhibited his
          work in notable exhibitions, including Un cuchillo que no corta, a
          solo show curated by Sofia Moisés at Galería Reus, Palma, Spain
          (2026). He has also presented his work at art fairs, including CAN
          Ibiza with Galería Reus, Ibiza, Spain (2026), ARCO Lisboa with LA BIBI
          + REUS, Lisbon, Portugal (2025), and UVNT Art Fair with STAIN
          Projects, Madrid, Spain (2025). He was a finalist at the Premi Ciutat
          de Palma Antoni Gelabert d’Arts Visuals (2024) and received the 1st
          Prize at the XXXVIII Certamen de Pintura de Sant Marçal de Marratxí
          (2025).
        </p>
      </div>

      {/* Imagen Horizontal (70% del ancho en sm, con difuminado en el 30% izq) */}
      <div className="relative w-full h-72 sm:h-auto sm:w-[70%] aspect-16/10 sm:aspect-video shrink-0 overflow-hidden">
        {/* La foto horizontal del autor */}
        <Image
          src="/benavides 3.png"
          alt="Foto del Autor"
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover m-0"
          priority
        />

        {/* Capa de difuminado sobre el lado izquierdo (máximo 30%) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            // El degradado empieza sólido con el fondo de tu web, se desvanece rápido y a partir del 30% queda 100% transparente
            background:
              "linear-gradient(90deg, var(--background, #fff) 0%, rgba(255,255,255,0.8) 10%, rgba(255,255,255,0.3) 22%, transparent 30%)",
          }}
        />
      </div>
    </div>
  );
}
