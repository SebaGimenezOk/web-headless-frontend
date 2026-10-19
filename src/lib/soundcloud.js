// src/lib/soundcloud.js

async function getRssTracks() {
  try {
    // Intentamos obtener el RSS público directo del usuario
    const res = await fetch("https://feeds.soundcloud.com/users/soundcloud:users:12345678/sounds.rss", {
      next: { revalidate: 60 }
    });

    let xmlText = "";

    if (!res.ok) {
      // Si la ID estática no resuelve, leemos la página del perfil para extraer la URL del RSS activa
      const profileRes = await fetch("https://soundcloud.com/bajoestasestrellas", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        next: { revalidate: 60 }
      });

      if (!profileRes.ok) return { programas: [], entrevistas: [] };

      const html = await profileRes.text();
      const rssMatch = html.match(/href="(https:\/\/feeds\.soundcloud\.com\/users\/soundcloud:users:\d+\/sounds\.rss)"/);

      if (!rssMatch) return { programas: [], entrevistas: [] };

      const realRssRes = await fetch(rssMatch[1], { next: { revalidate: 60 } });
      if (!realRssRes.ok) return { programas: [], entrevistas: [] };
      xmlText = await realRssRes.text();
    } else {
      xmlText = await res.text();
    }

    return parseRssXml(xmlText);
  } catch (error) {
    console.error("Error obteniendo el RSS de SoundCloud:", error);
    return { programas: [], entrevistas: [] };
  }
}

function parseRssXml(xmlText) {
  const items = xmlText.split("<item>");
  const programas = [];
  const entrevistas = [];

  items.slice(1).forEach((item, index) => {
    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/);
    const linkMatch = item.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
    const imageMatch = item.match(/<itunes:image href="(.*?)"/);

    const title = titleMatch ? titleMatch[1].trim() : "Sin título";
    const link = linkMatch ? linkMatch[1].trim() : "";
    const artwork = imageMatch ? imageMatch[1] : "/encabezado-cronicas-mobile.jpg";
    const date = pubDateMatch ? new Date(pubDateMatch[1]).toLocaleDateString("es-AR") : new Date().toLocaleDateString("es-AR");

    const trackObj = {
      id: `rss-${index}`,
      title,
      permalink_url: link,
      streamUrl: link,
      artwork_url: artwork,
      date
    };

    // Filtramos dinámicamente según el título
    if (title.toLowerCase().includes("entrevista")) {
      entrevistas.push(trackObj);
    } else {
      programas.push(trackObj);
    }
  });

  return { programas, entrevistas };
}

export async function getProgramasYEntrevistas() {
  return await getRssTracks();
}