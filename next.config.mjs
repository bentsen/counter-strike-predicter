/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.skinport.com",
      },
    ],
  },
};

export default nextConfig;
