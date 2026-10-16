import Link from "next/link";
import Image from "next/image";

export default function BajoEstrellasCTA() {
  return (
    <section className="relative w-full my-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto rounded-3xl bg-neutral-950 border border-[#bfa15f]/30 p-8 md:p-12 shadow-2xl overflow-hidden relative">
        
        {/* Fondo sutil con brillo estelar o acento */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#bfa15f]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Bloque de imagen / isologo secundario */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-black/40 flex items-center justify-center">
            <Image
              src="/Alejandro-Claudia-2.png"
              alt="Bajo Estas Estrellas Conductores"
              width={140}
              height={140}
              className="object-contain"
            />
          </div>

          {/* Textos descriptivos */}
          <div className="flex-1 space-y-3">
            <span className="text-[11px] mb-3 uppercase tracking-widest px-3 py-1 bg-[#bfa15f]/20 text-[#bfa15f] rounded-full font-semibold border border-[#bfa15f]/30">
              Espacio Radial Exclusivo
            </span>
            <h2 className="text-2xl md:text-3xl font-medium uppercase text-white tracking-wide">
              Bajo Estas Estrellas
            </h2>
            <p className="text-sm md:text-base text-neutral-400 font-light font-source leading-relaxed max-w-xl">
              Revive todas las ediciones grabadas, entrevistas imperdibles y bloques temáticos de cada estación de radio.
            </p>
          </div>

          {/* Botón de Acción (CTA) */}
          <div className="shrink-0">
            <Link
              href="/bajo-estas-estrellas"
              className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-black bg-[#bfa15f] hover:bg-white transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explorar Colección &rarr;
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}