/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "web-headless.local",
        pathname: "/wp-content/uploads/**",
      },
    ],
    dangerouslyAllowSVG: false,
    unoptimized: false,
  },
  experimental: {
    allowPrivateImage: true,
  },
};

export default nextConfig;
