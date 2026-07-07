import Image from 'next/image';

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
        <p className="text-xs tracking-wider font-medium text-(--text-strong) uppercase leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam id lorem tincidunt 
          consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
          Aliquam erat volutpat.
        </p>
        <p className="text-xs tracking-wider font-medium text-(--text-strong) uppercase leading-relaxed">
          Morbi eget efficitur turpis. Praesent ut accumsan nisi. Mauris feugiat lacus in lectus 
          viverra, quis convallis magna erat volutpat. Cras elementum, velit id varius interdum, 
          dui felis vulputate felis, vitae sodales lorem nisl id turpis.
        </p>
      </div>

    </div>
  );
}