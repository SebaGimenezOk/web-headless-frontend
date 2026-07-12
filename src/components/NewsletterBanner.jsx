"use client";

import React, { useState } from "react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="w-full border-y border-(--border) bg-(--surface)/40 py-10 md:py-14 px-4 sm:px-6 lg:px-8 my-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        
        {/* Izquierda: Título y Frase */}
        <div className="max-w-xl space-y-3">
          <h2 className="font-heading text-xl md:text-2xl lg:text-3xl text-(--text-strong) font-serif tracking-wide">
           LEELO ANTES QUE TODOS
          </h2>
          <p className="font-body text-(--text) text-sm md:text-base leading-relaxed opacity-90">
            Suscribite a nuestro Newsletter para recibir novedades sobre nuestas crónicas, newsletters, análisis y sugerencias.
          </p>
        </div>

        {/* Derecha: Formulario / Placeholder para Mail */}
        <div className="w-full md:w-auto md:min-w-100">
          {status === "success" ? (
            <div className="font-body text-sm text-(--olive) border border-(--olive) bg-(--olive)/5 p-4 rounded-sm text-center animate-fade-in">
              ¡Gracias por suscribirse! Pronto recibirá nuestras novedades.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
              <div className="relative grow">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 font-body text-sm bg-(--background) border border-(--border) text-(--text-strong) placeholder:text-(--text)/50 focus:outline-none focus:border-(--ocre) transition-colors rounded-sm disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                placeholder="enviar"
                className="px-6 py-3 font-heading font-medium text-xs tracking-wider uppercase bg-(--text-strong) text-(--surface) hover:bg-(--ocre) hover:text-(--text-strong) transition-all duration-300 rounded-sm disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {status === "loading" ? "Enviando..." : "Suscribirse"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs text-red-600 font-body">
              Hubo un error. Por favor, intente nuevamente.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}