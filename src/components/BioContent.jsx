import Image from "next/image";

export default function BioContent() {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 p-6 rounded-xl border border-border bg-surface text-text">
      {/* Información del Autor (ahora a la izquierda) */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-heading text-xl font-bold text-textStrong mb-2">
          Sobre el Autor
        </h3>
        <p className="font-body text-sm leading-relaxed text-text/90">
          Periodista, crítico musical y apasionado de la historia de la música.
          Escribe e investiga las crónicas de los conciertos, óperas y eventos
          más destacados.
        </p>
      </div>

      {/* Contenedor de la Imagen (ahora a la derecha) */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded-full border-2 border-ocre">
        <Image
          src="/benavides 3.jpg" // Puedes cambiarlo por /wolfangM.png o /amadeus1.jpg
          alt="Foto del Autor"
          fill
          sizes="(max-width: 768px) 96px, 128px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
