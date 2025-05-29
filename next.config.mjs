/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [new URL('https://image.tmdb.org/**')],
  },
  
};

export default nextConfig;
