/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  images: {
    unoptimized: true, // <--- esto desactiva la optimización que falla en export
    domains: ["www.cronicasdeunespectador.com"],
  },
};

export default nextConfig;