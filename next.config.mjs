/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exporta como site estático (necessário para GitHub Pages)
  output: 'export',
  trailingSlash: true,
  images: {
    // GitHub Pages não roda o Image Optimization server do Next.
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;
