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
  const stats = data?.find((r) => r.key === "stats")?.value || {};
  return { contact, content, about, hours, stats };
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
  const [q, p, c, qTotal, qDone, pDone] = await Promise.all([
    db.from("quotes").select("id", { count: "exact", head: true }).eq("status", "yeni"),
    db.from("preorders").select("id", { count: "exact", head: true }).eq("status", "yeni"),
    db.from("comments").select("id", { count: "exact", head: true }).eq("approved", false),
    db.from("quotes").select("id", { count: "exact", head: true }),
    db.from("quotes").select("id", { count: "exact", head: true }).eq("status", "tamamlandi"),
    db.from("preorders").select("id", { count: "exact", head: true }).eq("status", "tamamlandi"),
  ]);
  return {
    newQuotes: q.count || 0,
    newPreorders: p.count || 0,
    pendingComments: c.count || 0,
    totalQuotes: qTotal.count || 0,
    completedJobs: (qDone.count || 0) + (pDone.count || 0),
  };
}

/** Son 6 ayda ay bazında teklif ve ön sipariş sayısı (admin panel grafiği için) */
export async function getMonthlyActivity() {
  const db = supabaseAdmin();
  const since = new Date();
  since.setMonth(since.getMonth() - 5);
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  const [{ data: quotes }, { data: preorders }] = await Promise.all([
    db.from("quotes").select("created_at").gte("created_at", since.toISOString()),
    db.from("preorders").select("created_at").gte("created_at", since.toISOString()),
  ]);

  const months: { key: string; label: string }[] = [];
  const cursor = new Date(since);
  for (let i = 0; i < 6; i++) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
    const label = cursor.toLocaleDateString("tr-TR", { month: "short" });
    months.push({ key, label });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  const countByMonth = (rows: { created_at: string }[] | null, key: string) =>
    (rows || []).filter((r) => r.created_at.slice(0, 7) === key).length;

  return months.map((m) => ({
    label: m.label,
    teklif: countByMonth(quotes, m.key),
    onSiparis: countByMonth(preorders, m.key),
  }));
}
