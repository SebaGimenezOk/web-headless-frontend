import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "./TrackRowClient";

export default async function ProgramasList() {
  const { programas, entrevistas } = await getProgramasYEntrevistas();

  return (
    <section className="w-full py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* COLUMNA 1: OLIVA */}
        <div className="rounded-2xl p-6 md:p-8 bg-(--olive) shadow-lg">
          <header className="mb-8">
            <h2 className="text-2xl font-black uppercase text-white tracking-wide">Programas</h2>
            <div className="mt-2 h-1 w-12 bg-white/30" />
          </header>
          <div className="flex flex-col gap-4">
            {programas.map((item, index) => (
              <TrackRowClient key={item.id} item={item} index={index} variant="olive" />
            ))}
          </div>
        </div>

        {/* COLUMNA 2: DORADO MATE */}
        <div className="rounded-2xl p-6 md:p-8 bg-[#bfa15f] shadow-lg">
          <header className="mb-8">
            <h2 className="text-2xl font-black uppercase text-white tracking-wide">Entrevistas</h2>
            <div className="mt-2 h-1 w-12 bg-white/30" />
          </header>
          <div className="flex flex-col gap-4">
            {entrevistas.map((item, index) => (
              <TrackRowClient key={item.id} item={item} index={index} variant="gold" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}