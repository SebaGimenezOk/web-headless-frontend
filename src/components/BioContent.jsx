import Image from 'next/image';

export default function BioContent() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-8">
      
      {/* Bloque de Texto */}
      <div className="w-full sm:flex-1 prose prose-stone text-neutral-800 space-y-6 leading-relaxed text-justify">
        <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-neutral-950">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam id lorem tincidunt 
          consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
          Aliquam erat volutpat.
        </p>
        <p>
          Morbi eget efficitur turpis. Praesent ut accumsan nisi. Mauris feugiat lacus in lectus 
          viverra, quis convallis magna erat volutpat. Cras elementum, velit id varius interdum, 
          dui felis vulputate felis, vitae sodales lorem nisl id turpis.
        </p> <p>
          Morbi eget efficitur turpis. Praesent ut accumsan nisi. Mauris feugiat lacus in lectus 
          viverra, quis convallis magna erat volutpat. Cras elementum, velit id varius interdum, 
          dui felis vulputate felis, vitae sodales lorem nisl id turpis.
        </p> <p>
          Morbi eget efficitur turpis. Praesent ut accumsan nisi. Mauris feugiat lacus in lectus 
          viverra, quis convallis magna erat volutpat. Cras elementum, velit id varius interdum, 
          dui felis vulputate felis, vitae sodales lorem nisl id turpis.
        </p> <p>
          Morbi eget efficitur turpis. Praesent ut accumsan nisi. Mauris feugiat lacus in lectus 
          viverra, quis convallis magna erat volutpat. Cras elementum, velit id varius interdum, 
          dui felis vulputate felis, vitae sodales lorem nisl id turpis.
        </p> <p>
          Morbi eget efficitur turpis. Praesent ut accumsan nisi. Mauris feugiat lacus in lectus 
          viverra, quis convallis magna erat volutpat. Cras elementum, velit id varius interdum, 
          dui felis vulputate felis, vitae sodales lorem nisl id turpis.
        </p>
      </div>

      {/* Imagen Horizontal (70% del ancho en sm, con difuminado en el 30% izq) */}
      <div className="relative w-full h-56 sm:h-auto sm:w-[70%] aspect-[16/10] sm:aspect-[16/9] flex-shrink-0 overflow-hidden">
        
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
            background: 'linear-gradient(90deg, var(--background, #fff) 0%, rgba(255,255,255,0.8) 10%, rgba(255,255,255,0.3) 22%, transparent 30%)'
          }}
        />
      </div>

    </div>
  );
}