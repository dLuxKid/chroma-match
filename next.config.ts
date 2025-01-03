// import type { NextConfig } from "next";
import withPWA from "next-pwa";

const pwaConfigs = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig: any = pwaConfigs({
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
    {
      source: "/sw.js",
      headers: [
        { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self'",
        },
      ],
    },
  ],
}) as any;

export default nextConfig;
