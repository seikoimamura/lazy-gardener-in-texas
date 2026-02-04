/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'vrecwheuuu1jmtae.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
