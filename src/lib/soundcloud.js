// =========================================================================
// 1. TU FUNCIÓN ORIGINAL (Totalmente intacta, no tocamos nada del Player)
// =========================================================================
export async function resolveTrack(url) {
  const client_id = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;

  const res = await fetch(
    `https://api.soundcloud.com/resolve?url=${url}&client_id=${client_id}`
  );

  const data = await res.json();

  return {
    streamUrl: `${data.stream_url}?client_id=${client_id}`,
    title: data.title,
  };
}

// =========================================================================
// 2. NUEVA ESTRATEGIA: LECTURA DIRECTA DESDE TU PÁGINA PÚBLICA (HTML PARSER)
// =========================================================================
export async function getProgramasYEntrevistas() {
  try {
    // Le pegamos directo a la web pública de tus listas
    const [resProg, resEntr] = await Promise.all([
      fetch("https://soundcloud.com/bajoestasestrellas/sets/programas-completos", {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
        next: { revalidate: 60 } // Cache corta de 1 minuto para pruebas rápidos
      }),
      fetch("https://soundcloud.com/bajoestasestrellas/sets/entrevistas", {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
        next: { revalidate: 60 }
      })
    ]);

    const programas = [];
    const entrevistas = [];

    // PROCESAMOS PROGRAMAS
    if (resProg.ok) {
      const html = await resProg.text();
      // Buscamos los patrones de links que SoundCloud deja para motores de búsqueda como Google
      const matches = html.matchAll(/<a itemprop="url" href="([^"]+)">([^<]+)<\/a>/g);
      let count = 0;
      for (const match of matches) {
        if (count >= 4) break;
        const link = match[1];
        const title = match[2].trim();
        if (link.includes("/sets/")) continue; // Ignoramos links internos al álbum

        programas.push({
          id: `prog-${count}`,
          title: title,
          permalink_url: link.startsWith("http") ? link : `https://soundcloud.com${link}`,
          artwork_url: null,
          date: new Date().toLocaleDateString("es-AR")
        });
        count++;
      }
    }

    // PROCESAMOS ENTREVISTAS
    if (resEntr.ok) {
      const html = await resEntr.text();
      const matches = html.matchAll(/<a itemprop="url" href="([^"]+)">([^<]+)<\/a>/g);
      let count = 0;
      for (const match of matches) {
        if (count >= 4) break;
        const link = match[1];
        const title = match[2].trim();
        if (link.includes("/sets/")) continue;

        entrevistas.push({
          id: `entr-${count}`,
          title: title,
          permalink_url: link.startsWith("http") ? link : `https://soundcloud.com${link}`,
          artwork_url: null,
          date: new Date().toLocaleDateString("es-AR")
        });
        count++;
      }
    }

    // NUEVO LOG IMPRESO (Si ves el cartel viejo, es porque el archivo no se guardó)
    console.log("--- NUEVO SISTEMA LMDX ---");
    console.log("Programas parseados:", programas.length);
    console.log("Entrevistas parseadas:", entrevistas.length);

    return { programas, entrevistas };

  } catch (error) {
    console.error("Error crítico leyendo las listas:", error);
    return { programas: [], entrevistas: [] };
  }
}