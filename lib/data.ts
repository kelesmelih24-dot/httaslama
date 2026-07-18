import { supabasePublic } from "@/lib/supabase";
import type {
  Service,
  Reference,
  Comment,
  SiteSettings,
  GalleryItem,
  Faq,
  Post,
  AboutSettings,
  HoursSettings,
} from "@/lib/types";

export async function getServices(): Promise<Service[]> {
  const { data } = await supabasePublic()
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });
  return (data as Service[]) || [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data } = await supabasePublic()
    .from("services")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return (data as Service) || null;
}

export async function getReferences(): Promise<Reference[]> {
  const { data } = await supabasePublic()
    .from("references_list")
    .select("*")
    .order("order_index", { ascending: true });
  return (data as Reference[]) || [];
}

export async function getApprovedComments(): Promise<Comment[]> {
  const { data } = await supabasePublic()
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
    "Uzman ekibimiz; delik, silindirik ve satıh taşlama işlerinde hızlı, ölçülü ve garantili çözüm sunar.",
  about_text:
    "HT Makina Taşlama, hassas metal işleme ihtiyaçlarında mikron toleransla çalışır.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await supabasePublic().from("site_settings").select("*");
  const contact = data?.find((r) => r.key === "contact")?.value || {};
  const content = data?.find((r) => r.key === "content")?.value || {};
  return { ...DEFAULT_SETTINGS, ...contact, ...content };
}

const DEFAULT_ABOUT: AboutSettings = {
  story:
    "HT Makina Taşlama, yılların verdiği tecrübeyle kuruldu.",
  years_experience: 10,
  mission: "Her parçayı istenen toleransta, zamanında ve ilk seferde doğru teslim etmek.",
  vision: "Hassas metal işlemede bölgenin ilk tercih edilen atölyesi olmak.",
  quality_policy: "Her iş, ölçüm ve kontrolden geçmeden teslim edilmez.",
  safety_policy: "Atölyede iş güvenliği kurallarına eksiksiz uyulur.",
};

const DEFAULT_HOURS: HoursSettings = {
  hafta_ici_cumartesi: "08:30 - 18:30",
  pazar: "Kapalı",
};

export async function getAboutSettings(): Promise<AboutSettings> {
  const { data } = await supabasePublic()
    .from("site_settings")
    .select("*")
    .eq("key", "about")
    .maybeSingle();
  return { ...DEFAULT_ABOUT, ...(data?.value || {}) };
}

export async function getHoursSettings(): Promise<HoursSettings> {
  const { data } = await supabasePublic()
    .from("site_settings")
    .select("*")
    .eq("key", "hours")
    .maybeSingle();
  return { ...DEFAULT_HOURS, ...(data?.value || {}) };
}

export async function getGallery(): Promise<GalleryItem[]> {
  const { data } = await supabasePublic()
    .from("gallery")
    .select("*")
    .order("order_index", { ascending: true });
  return (data as GalleryItem[]) || [];
}

export async function getFaqs(): Promise<Faq[]> {
  const { data } = await supabasePublic()
    .from("faqs")
    .select("*")
    .order("order_index", { ascending: true });
  return (data as Faq[]) || [];
}

export async function getPublishedPosts(): Promise<Post[]> {
  const { data } = await supabasePublic()
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return (data as Post[]) || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data } = await supabasePublic()
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Post) || null;
}
