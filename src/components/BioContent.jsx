import Image from 'next/image';

export default function BioContent() {
  return (
    <div className="prose prose-stone mx-auto text-neutral-800 space-y-6 leading-relaxed text-justify flex flex-col sm:flex-row items-stretch gap-6">
      
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

      {/* Imagen Mediana con Corte Diagonal y Viñeta Blanca */}
      <div 
        className="relative w-full h-48 sm:w-64 sm:h-auto flex-shrink-0 overflow-hidden bg-white"
        style={{
          // Clip-path para hacer el corte diagonal (desplazado 100px a la derecha arriba)
          clipPath: 'polygon(calc(0% + 100px) 0%, 100% 0%, 100% 100%, 0% 100%)',
          
          // Máscara de degradado diagonal para lograr el efecto viñeta blanca (difuminado de 100px)
          WebkitMaskImage: 'linear-gradient(115deg, transparent 0px, transparent 40px, black 140px)',
          maskImage: 'linear-gradient(115deg, transparent 0px, transparent 40px, black 140px)'
        }}
      >
        <Image
          src="/benavides 03.jpg" 
          alt="Foto del Autor"
          fill
          sizes="(max-width: 768px) 100vw, 256px"
          className="object-cover m-0"
          priority
        />
      </div>

    </div>
  );
}