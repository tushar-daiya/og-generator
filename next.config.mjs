/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "92nbtdaht8vknuvk.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
