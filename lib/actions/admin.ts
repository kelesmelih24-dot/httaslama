"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import type { QuoteStatus, PreorderStatus } from "@/lib/types";

function slugify(input: string) {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
    Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------- HİZMETLER ----------------
export async function upsertService(formData: FormData) {
  const db = supabaseAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");

  const payload = {
    title,
    slug: slugify(title),
    summary: String(formData.get("summary") || ""),
    detail: String(formData.get("detail") || "") || null,
    tolerance_note: String(formData.get("tolerance_note") || "") || null,
    order_index: Number(formData.get("order_index") || 0),
  };

  if (id) {
    await db.from("services").update(payload).eq("id", id);
  } else {
    await db.from("services").insert(payload);
  }
  revalidatePath("/yonetim/hizmetler");
  revalidatePath("/hizmetler");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  const db = supabaseAdmin();
  await db.from("services").delete().eq("id", id);
  revalidatePath("/yonetim/hizmetler");
  revalidatePath("/hizmetler");
}

// ---------------- REFERANSLAR ----------------
export async function upsertReference(formData: FormData) {
  const db = supabaseAdmin();
  const id = String(formData.get("id") || "");
  const payload = {
    name: String(formData.get("name") || ""),
    logo_url: String(formData.get("logo_url") || ""),
    order_index: Number(formData.get("order_index") || 0),
  };
  if (id) {
    await db.from("references_list").update(payload).eq("id", id);
  } else {
    await db.from("references_list").insert(payload);
  }
  revalidatePath("/yonetim/referanslar");
  revalidatePath("/referanslar");
  revalidatePath("/");
}

export async function deleteReference(id: string) {
  const db = supabaseAdmin();
  await db.from("references_list").delete().eq("id", id);
  revalidatePath("/yonetim/referanslar");
  revalidatePath("/referanslar");
}

// ---------------- TEKLİFLER ----------------
export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  const db = supabaseAdmin();
  await db.from("quotes").update({ status }).eq("id", id);
  revalidatePath("/yonetim/teklifler");
}

// ---------------- ÖN SİPARİŞLER ----------------
export async function updatePreorderStatus(id: string, status: PreorderStatus) {
  const db = supabaseAdmin();
  await db.from("preorders").update({ status }).eq("id", id);
  revalidatePath("/yonetim/on-siparisler");
}

// ---------------- YORUMLAR ----------------
export async function setCommentApproval(id: string, approved: boolean) {
  const db = supabaseAdmin();
  await db.from("comments").update({ approved }).eq("id", id);
  revalidatePath("/yonetim/yorumlar");
  revalidatePath("/yorumlar");
  revalidatePath("/");
}

export async function deleteComment(id: string) {
  const db = supabaseAdmin();
  await db.from("comments").delete().eq("id", id);
  revalidatePath("/yonetim/yorumlar");
  revalidatePath("/yorumlar");
}

// ---------------- GALERİ ----------------
export async function upsertGalleryItem(formData: FormData) {
  const db = supabaseAdmin();
  const id = String(formData.get("id") || "");
  const payload = {
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || "atolye"),
    image_url: String(formData.get("image_url") || ""),
    before_image_url: String(formData.get("before_image_url") || "") || null,
    order_index: Number(formData.get("order_index") || 0),
  };
  if (id) {
    await db.from("gallery").update(payload).eq("id", id);
  } else {
    await db.from("gallery").insert(payload);
  }
  revalidatePath("/yonetim/galeri");
  revalidatePath("/galeri");
}

export async function deleteGalleryItem(id: string) {
  const db = supabaseAdmin();
  await db.from("gallery").delete().eq("id", id);
  revalidatePath("/yonetim/galeri");
  revalidatePath("/galeri");
}

// ---------------- SSS ----------------
export async function upsertFaq(formData: FormData) {
  const db = supabaseAdmin();
  const id = String(formData.get("id") || "");
  const payload = {
    question: String(formData.get("question") || ""),
    answer: String(formData.get("answer") || ""),
    order_index: Number(formData.get("order_index") || 0),
  };
  if (id) {
    await db.from("faqs").update(payload).eq("id", id);
  } else {
    await db.from("faqs").insert(payload);
  }
  revalidatePath("/yonetim/sss");
  revalidatePath("/sss");
}

export async function deleteFaq(id: string) {
  const db = supabaseAdmin();
  await db.from("faqs").delete().eq("id", id);
  revalidatePath("/yonetim/sss");
  revalidatePath("/sss");
}

// ---------------- BLOG ----------------
function slugifyPost(input: string) {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
    Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function upsertPost(formData: FormData) {
  const db = supabaseAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const payload = {
    title,
    slug: slugifyPost(title),
    excerpt: String(formData.get("excerpt") || "") || null,
    content: String(formData.get("content") || ""),
    cover_image_url: String(formData.get("cover_image_url") || "") || null,
    published: formData.get("published") === "on",
  };
  if (id) {
    await db.from("posts").update(payload).eq("id", id);
  } else {
    await db.from("posts").insert(payload);
  }
  revalidatePath("/yonetim/blog");
  revalidatePath("/blog");
}

export async function deletePost(id: string) {
  const db = supabaseAdmin();
  await db.from("posts").delete().eq("id", id);
  revalidatePath("/yonetim/blog");
  revalidatePath("/blog");
}

// ---------------- SİTE AYARLARI: HAKKIMIZDA & ÇALIŞMA SAATLERİ ----------------
export async function updateAboutSettings(formData: FormData) {
  const db = supabaseAdmin();
  const value = {
    story: String(formData.get("story") || ""),
    years_experience: Number(formData.get("years_experience") || 0),
    mission: String(formData.get("mission") || ""),
    vision: String(formData.get("vision") || ""),
    quality_policy: String(formData.get("quality_policy") || ""),
    safety_policy: String(formData.get("safety_policy") || ""),
  };
  await db.from("site_settings").upsert({ key: "about", value });
  revalidatePath("/hakkimizda");
}

export async function updateHoursSettings(formData: FormData) {
  const db = supabaseAdmin();
  const value = {
    hafta_ici_cumartesi: String(formData.get("hafta_ici_cumartesi") || ""),
    pazar: String(formData.get("pazar") || ""),
  };
  await db.from("site_settings").upsert({ key: "hours", value });
  revalidatePath("/iletisim");
}
export async function updateContactSettings(formData: FormData) {
  const db = supabaseAdmin();
  const value = {
    phone: String(formData.get("phone") || ""),
    whatsapp: String(formData.get("whatsapp") || ""),
    email: String(formData.get("email") || ""),
    address: String(formData.get("address") || ""),
  };
  await db.from("site_settings").upsert({ key: "contact", value });
  revalidatePath("/", "layout");
}

export async function updateContentSettings(formData: FormData) {
  const db = supabaseAdmin();
  const value = {
    hero_title: String(formData.get("hero_title") || ""),
    hero_subtitle: String(formData.get("hero_subtitle") || ""),
    about_text: String(formData.get("about_text") || ""),
  };
  await db.from("site_settings").upsert({ key: "content", value });
  revalidatePath("/", "layout");
}
