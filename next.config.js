/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
