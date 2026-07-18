import { supabaseAdmin } from "@/lib/supabase";
import type { Quote, Preorder, Comment, Service, Reference, GalleryItem, Faq, Post } from "@/lib/types";

export async function getAllQuotes(): Promise<Quote[]> {
  const db = supabaseAdmin();
  const { data } = await db.from("quotes").select("*").order("created_at", { ascending: false });
  return (data as Quote[]) || [];
}

export async function getAllPreorders(): Promise<Preorder[]> {
  const db = supabaseAdmin();
  const { data } = await db.from("preorders").select("*").order("created_at", { ascending: false });
  return (data as Preorder[]) || [];
}

export async function getAllComments(): Promise<Comment[]> {
  const db = supabaseAdmin();
  const { data } = await db.from("comments").select("*").order("created_at", { ascending: false });
  return (data as Comment[]) || [];
}

export async function getAllServicesAdmin(): Promise<Service[]> {
  const db = supabaseAdmin();
  const { data } = await db.from("services").select("*").order("order_index", { ascending: true });
  return (data as Service[]) || [];
}

export async function getAllReferencesAdmin(): Promise<Reference[]> {
  const db = supabaseAdmin();
  const { data } = await db
    .from("references_list")
    .select("*")
    .order("order_index", { ascending: true });
  return (data as Reference[]) || [];
}

export async function getAdminSettings() {
  const db = supabaseAdmin();
  const { data } = await db.from("site_settings").select("*");
  const contact = data?.find((r) => r.key === "contact")?.value || {};
  const content = data?.find((r) => r.key === "content")?.value || {};
  const about = data?.find((r) => r.key === "about")?.value || {};
  const hours = data?.find((r) => r.key === "hours")?.value || {};
  return { contact, content, about, hours };
}

export async function getAllGalleryAdmin(): Promise<GalleryItem[]> {
  const db = supabaseAdmin();
  const { data } = await db.from("gallery").select("*").order("order_index", { ascending: true });
  return (data as GalleryItem[]) || [];
}

export async function getAllFaqsAdmin(): Promise<Faq[]> {
  const db = supabaseAdmin();
  const { data } = await db.from("faqs").select("*").order("order_index", { ascending: true });
  return (data as Faq[]) || [];
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  const db = supabaseAdmin();
  const { data } = await db.from("posts").select("*").order("created_at", { ascending: false });
  return (data as Post[]) || [];
}

export async function getDashboardCounts() {
  const db = supabaseAdmin();
  const [q, p, c] = await Promise.all([
    db.from("quotes").select("id", { count: "exact", head: true }).eq("status", "yeni"),
    db.from("preorders").select("id", { count: "exact", head: true }).eq("status", "yeni"),
    db.from("comments").select("id", { count: "exact", head: true }).eq("approved", false),
  ]);
  return {
    newQuotes: q.count || 0,
    newPreorders: p.count || 0,
    pendingComments: c.count || 0,
  };
}
