# Crónicas de un Espectador | Headless Web Platform

![Next.js](https://img.shields.io/badge/Next.js-14%2F15-black?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)
![WordPress](https://img.shields.io/badge/WordPress_Headless-CMS-21759B?style=flat-square&logo=wordpress&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Deploy](https://img.shields.io/badge/Vercel-Production-000000?style=flat-square&logo=vercel&logoColor=white)

Plataforma web moderna y cultural desarrollada con **Next.js** en el frontend y **WordPress Headless** como CMS backend. Diseñada para la difusión de críticas de teatro, notas de opinión, cobertura de artes escénicas y episodios de podcast.

🔗 **Sitio en producción:** [cronicasdeunespectador.com](https://cronicasdeunespectador.com)

---

## 🏛️ Arquitectura del Proyecto

Este proyecto implementa un modelo **Headless CMS**, desacoplando la gestión de contenidos de alto tráfico de la interfaz de usuario:
* **Backend (CMS):** WordPress configurado como API REST / WPGraphQL para la administración ágil de artículos, categorías y metadatos multimedia.
* **Frontend:** Next.js optimizado para renderizado híbrido (SSR/ISR), garantizando tiempos de carga veloces y posicionamiento SEO orgánico excepcional.

---

## 🛠️ Tech Stack & Herramientas

* **Framework Frontend:** Next.js (React)
* **Estilos & UI:** Tailwind CSS (diseño editorial elegante y responsive)
* **Gestión de Datos:** Consumo de API REST de WordPress / Scripts de migración y scraping (Node.js) para recuperación de archivos históricos
* **Optimización de Medios:** Imágenes optimizadas en formato WebP y sitemaps dinámicos indexados
* **Despliegue & Hosting:** Vercel (CI/CD automatizado)

---

## ✨ Características Principales

* 🎭 **Sección Editorial & Críticas:** Visualización estructurada para notas de teatro, entrevistas y coberturas culturales.
* 🎙️ **Episodios de Podcast:** Integración multimedia para reproducción y seguimiento de emisiones.
* 🔍 **SEO Integral y Metadatos:** Etiquetas Open Graph configuradas para un intercambio impecable en redes sociales y buscadores.
* ⚙️ **Optimización de Assets:** Carga diferida y compresión avanzada para máxima fluidez de lectura.

---

## 💻 Desarrollo Local

Para levantar este proyecto en tu entorno local:

* Clonar repositorio: `git clone https://github.com/SebaGimenezOk/web-headless-frontend.git`
* Entrar al directorio: `cd web-headless-frontend`
* Instalar dependencias: `npm install`
* Configurar variables de entorno (`.env.local` con la URL del WordPress Headless)
* Iniciar servidor de desarrollo: `npm run dev`
* Compilar para producción: `npm run build`

---

## 👤 Autor & Contacto

**Sebastián Marcial Giménez López** — Frontend & Full Stack Developer  
* 📍 Buenos Aires, Argentina  
* 🌐 Portfolio: [portfolio2026-puce-three.vercel.app](https://portfolio2026-puce-three.vercel.app)  
* 💼 LinkedIn: [linkedin.com/in/sebagimenez](https://linkedin.com/in/sebagimenez)
