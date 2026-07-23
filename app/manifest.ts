import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HT Makina Taşlama - Yönetim Paneli",
    short_name: "HT Yönetim",
    description: "HT Makina Taşlama sitesi için yönetim paneli",
    start_url: "/yonetim",
    scope: "/yonetim",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0D0D0D",
    theme_color: "#D8301F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
