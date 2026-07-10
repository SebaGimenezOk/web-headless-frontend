import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "./TrackRowClient"; // <-- Ahora la importamos desde su propio cliente

export default async function ProgramasList() {
  const { programas, entrevistas } = await getProgramasYEntrevistas();

  console.清log && console.log("--- TEST SOUNDCLOUD ---");
  console.log("Cantidad de Programas encontrados:", programas.length);
  console.log("Cantidad de Entrevistas encontradas:", entrevistas.length);

  return (
    <section className="w-full border-t border-text/10 py-16 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          
          {/* COLUMNA 1: PROGRAMAS COMPLETOS */}
          <div>
            <header className="mb-6 text-left">
              <h2 className="text-xl md:text-2xl font-black text-text tracking-wide uppercase">
                Programas Completos
              </h2>
              <div className="mt-1.5 h-0.5 w-12 bg-text opacity-80" />
            </header>

            <div className="divide-y divide-text/10">
              {programas.map((item, index) => (
                <TrackRowClient key={item.id} item={item} index={index} />
              ))}
              {programas.length === 0 && (
                <p className="text-sm text-text/40 py-4">No hay programas disponibles.</p>
              )}
            </div>
          </div>

          {/* COLUMNA 2: ENTREVISTAS */}
          <div>
            <header className="mb-6 text-left">
              <h2 className="text-xl md:text-2xl font-black text-text tracking-wide uppercase">
                Entrevistas Destacadas
              </h2>
              <div className="mt-1.5 h-0.5 w-12 bg-text opacity-80" />
            </header>

            <div className="divide-y divide-text/10">
              {entrevistas.map((item, index) => (
                <TrackRowClient key={item.id} item={item} index={index} />
              ))}
              {entrevistas.length === 0 && (
                <p className="text-sm text-text/40 py-4">No hay entrevistas disponibles.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}