/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",

  images: {
    unoptimized: true, // Mantenemos tu configuración intacta para el export fijo
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cronicasdeunespectador.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.sndcdn.com", // El CDN de SoundCloud para las miniaturas nuevas
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;