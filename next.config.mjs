/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static site -> folder `out/`
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
