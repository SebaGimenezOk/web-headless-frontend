"use client";

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm uppercase tracking-wider max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-neutral-900">Nombre</label>
        <input 
          type="text" 
          className="w-full p-3 bg-transparent border border-black/10 focus:border-black outline-none transition-colors"
          placeholder="Lorem Ipsum"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-neutral-900">Email</label>
        <input 
          type="email" 
          className="w-full p-3 bg-transparent border border-black/10 focus:border-black outline-none transition-colors"
          placeholder="lorem@ipsum.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-neutral-900">Mensaje</label>
        <textarea 
          rows="5" 
          className="w-full p-3 bg-transparent border border-black/10 focus:border-black outline-none transition-colors normal-case"
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>

      <button 
        type="submit" 
        className="mt-4 bg-neutral-900 text-white py-3 hover:opacity-90 transition-opacity font-medium tracking-widest text-xs"
      >
        Enviar
      </button>
    </form>
  );
}