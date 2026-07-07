
import Image from 'next/image';

export default function BioContent() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch gap-8">
      
      {/* Bloque de Texto con tus estilos limpios y justificados */}
      <div className="flex-1 prose prose-stone text-neutral-800 space-y-6 leading-relaxed text-justify">
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
         <p>
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

      {/* Imagen 20% más grande con difuminado diagonal real integrado al fondo */}
      <div className="relative w-full h-56 sm:w-77 sm:h-auto shrink-0 overflow-hidden">
        
        {/* La foto del autor */}
        <Image
          src="/benavides 3.png"
          alt="Foto del Autor"
          fill
          sizes="(max-width: 768px) 100vw, 308px"
          className="object-cover m-0"
          priority
        />

       
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(115deg, var(--background, #fff) 0%, rgba(255,255,255,0.9) 15%, rgba(255,255,255,0.5) 45%, transparent 75%)'
          }}
        />
      </div>

    </div>
  );
}