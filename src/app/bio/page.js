import BioContent from "@/components/BioContent";

export default function BioPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl uppercase tracking-widest text-neutral-900 mb-8 text-center font-normal">
        Biografía
      </h1>
      <BioContent />
    </main>
  );
}