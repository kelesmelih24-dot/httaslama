import { supabasePublic } from "@/lib/supabase";
import type { Service, Reference, Comment, SiteSettings } from "@/lib/types";

export async function getServices(): Promise<Service[]> {
  const { data } = await supabasePublic
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });
  return (data as Service[]) || [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data } = await supabasePublic
    .from("services")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return (data as Service) || null;
}

export async function getReferences(): Promise<Reference[]> {
  const { data } = await supabasePublic
    .from("references_list")
    .select("*")
    .order("order_index", { ascending: true });
  return (data as Reference[]) || [];
}

export async function getApprovedComments(): Promise<Comment[]> {
  const { data } = await supabasePublic
    .from("comments")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });
  return (data as Comment[]) || [];
}

const DEFAULT_SETTINGS: SiteSettings = {
  phone: "0537 349 14 02",
  whatsapp: "905373491402",
  email: "info@htmakinataslama.com",
  address: "İvedik OSB, 1459. Sokak No:7, 06374 Yenimahalle/Ankara",
  hero_title: "MİKRON HASSASİYETİNDE TAŞLAMA",
  hero_subtitle:
    "Batuhan Usta ve ekibi; delik, silindirik ve satıh taşlama işlerinde hızlı, ölçülü ve garantili çözüm sunar.",
  about_text:
    "HT Makina Taşlama, hassas metal işleme ihtiyaçlarında mikron toleransla çalışır.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await supabasePublic.from("site_settings").select("*");
  const contact = data?.find((r) => r.key === "contact")?.value || {};
  const content = data?.find((r) => r.key === "content")?.value || {};
  return { ...DEFAULT_SETTINGS, ...contact, ...content };
}
