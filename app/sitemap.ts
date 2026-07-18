import type { MetadataRoute } from "next";
import { getServices, getPublishedPosts } from "@/lib/data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://htmakinataslama.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/hakkimizda",
    "/hizmetler",
    "/galeri",
    "/referanslar",
    "/blog",
    "/sss",
    "/on-siparis",
    "/yorumlar",
    "/iletisim",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  let serviceRoutes: MetadataRoute.Sitemap = [];
  let postRoutes: MetadataRoute.Sitemap = [];

  try {
    const services = await getServices();
    serviceRoutes = services.map((s) => ({
      url: `${BASE_URL}/hizmetler/${s.slug}`,
      lastModified: new Date(s.created_at),
    }));
  } catch {
    // Supabase erişilemezse sitemap yine de statik rotalarla döner
  }

  try {
    const posts = await getPublishedPosts();
    postRoutes = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.created_at),
    }));
  } catch {
    // yut
  }

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
