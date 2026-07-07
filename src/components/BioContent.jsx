 
 import Image from "next/image";
 
 export default function BioContent() {
  return (
     <div className="prose prose-stone mx-auto text-neutral-800 space-y-6 leading-relaxed text-justify flex flex-col sm:flex-row items-center sm:items-start gap-6">
      
      {/* Bloque de Texto Original */}
      <div className="flex-1 space-y-6">
        <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-neutral-950">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam id lorem tincidunt 
          consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
          Aliquam erat volutpat.
        </p>
        <p>
          Morbi eget efficitur turpis. Praesent ut accumsan nisi. Mauris feugiat lacus in lectus 
          viverra, quis convallis magna erat volutpat. Cras elementum, velit id varius interdum, 
          dui felis vulputate felis, vitae sodales lorem nisl id turpis.
        </p>
      </div>

      {/* Imagen del Autor a la Derecha */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-full border-2 border-neutral-300 sm:mt-2">
        <Image
          src="/wolfang.jpg" // Cambiala por la que prefieras de tu carpeta public
          alt="Foto del Autor"
          fill
          sizes="(max-width: 768px) 96px, 128px"
          className="object-cover m-0" // m-0 evita que prose le agregue márgenes por defecto
          priority
        />
      </div>

    </div>
  );
}

