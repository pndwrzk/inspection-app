import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["storage.googleapis.com"], // Tambahkan domain ini
  },
};

export default nextConfig;
