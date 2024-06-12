/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.skinport.com",
      },
      {
        hostname: "cdn.csgoskins.gg",
      },
    ],
  },
};

export default nextConfig;
