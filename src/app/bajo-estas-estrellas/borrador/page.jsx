import { getProgramasYEntrevistas } from "@/lib/soundcloud";
import TrackRowClient from "@/components/TrackRowClient";
import Image from "next/image";

export const metadata = {
  title: 'Borrador SoundCloud | Crónicas de un Espectador',
};

export default async function BorradorSoundCloudPage() {
  const data = await getProgramasYEntrevistas();
  
  const entrevistas = data?.entrevistas ? [...data.entrevistas].reverse() : [];
  const programas = data?.programas ? [...data.programas].reverse() : [];

  return (
    <main className="relative w-full py-16 px-4 md:px-6 bg-zinc-950 text-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Página Borrador - Prueba de Audios</h1>
            <p className="text-sm text-zinc-400">Verificando carga completa de SoundCloud.</p>
          </div>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full font-mono">
            Draft Mode
          </span>
        </div>

        {/* Sección de Entrevistas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-amber-400">
            Entrevistas Detectadas ({entrevistas.length})
          </h2>
          <div className="flex flex-col gap-3">
            {entrevistas.map((item, index) => (
              <TrackRowClient key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Sección de Programas */}
        <div className="space-y-4 pt-6 border-t border-zinc-800">
          <h2 className="text-xl font-semibold text-amber-400">
            Programas Detectados ({programas.length})
          </h2>
          <div className="flex flex-col gap-3">
            {programas.map((item, index) => (
              <TrackRowClient key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}