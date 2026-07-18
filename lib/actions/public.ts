"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { sendTelegramMessage } from "@/lib/telegram";

type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * Basit spam/bot koruması: forma gizli bir "website" alanı eklenir (gerçek
 * kullanıcılar göremez/dolduramaz). Bot bu alanı doldurursa istek sessizce
 * yok sayılır — botu şüphelendirmemek için yine de "başarılı" dönülür.
 */
function isBot(formData: FormData): boolean {
  const honeypot = formData.get("website");
  return typeof honeypot === "string" && honeypot.trim().length > 0;
}

const quoteSchema = z.object({
  full_name: z.string().min(2, "Ad soyad gerekli"),
  company_name: z.string().optional(),
  phone: z.string().min(7, "Geçerli bir telefon girin"),
  email: z.string().email().optional().or(z.literal("")),
  service_type: z.string().optional(),
  material: z.string().optional(),
  quantity: z.coerce.number().int().positive().optional(),
  delivery_date: z.string().optional(),
  budget_range: z.string().optional(),
  preferred_contact: z.string().optional(),
  description: z.string().min(10, "Lütfen işi biraz daha detaylandırın"),
});

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

async function uploadFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("Dosya çok büyük (maksimum 10 MB).");
  }
  const db = supabaseAdmin();
  const ext = file.name.split(".").pop() || "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await db.storage.from("teklif-dosyalari").upload(path, file, {
    contentType: file.type || "application/octet-stream",
  });
  if (error) {
    console.error("Dosya yükleme hatası:", error);
    return null;
  }
  const { data } = db.storage.from("teklif-dosyalari").getPublicUrl(path);
  return data.publicUrl;
}

export async function submitQuote(formData: FormData): Promise<ActionResult> {
  if (isBot(formData)) return { ok: true };

  const parsed = quoteSchema.safeParse({
    full_name: formData.get("full_name"),
    company_name: formData.get("company_name") || "",
    phone: formData.get("phone"),
    email: formData.get("email") || "",
    service_type: formData.get("service_type") || "",
    material: formData.get("material") || "",
    quantity: formData.get("quantity") || undefined,
    delivery_date: formData.get("delivery_date") || "",
    budget_range: formData.get("budget_range") || "",
    preferred_contact: formData.get("preferred_contact") || "",
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  let fileUrl: string | null = null;
  try {
    fileUrl = await uploadFile(formData.get("file") as File | null);
  } catch (err: any) {
    return { ok: false, error: err.message || "Dosya yüklenemedi." };
  }

  const db = supabaseAdmin();
  const { error } = await db.from("quotes").insert({
    full_name: parsed.data.full_name,
    company_name: parsed.data.company_name || null,
    phone: parsed.data.phone,
    email: parsed.data.email || null,
    service_type: parsed.data.service_type || null,
    material: parsed.data.material || null,
    quantity: parsed.data.quantity || null,
    delivery_date: parsed.data.delivery_date || null,
    budget_range: parsed.data.budget_range || null,
    preferred_contact: parsed.data.preferred_contact || null,
    file_url: fileUrl,
    description: parsed.data.description,
  });

  if (error) {
    console.error(error);
    return { ok: false, error: "Kaydedilirken bir hata oluştu, tekrar deneyin." };
  }

  await sendTelegramMessage(
    `🔥 <b>Yeni Teklif Talebi</b>\n` +
      `👤 ${parsed.data.full_name}${parsed.data.company_name ? ` (${parsed.data.company_name})` : ""}\n` +
      `📞 ${parsed.data.phone}\n` +
      (parsed.data.preferred_contact ? `☎️ Tercih: ${parsed.data.preferred_contact}\n` : "") +
      (parsed.data.service_type ? `🛠 ${parsed.data.service_type}\n` : "") +
      (parsed.data.material ? `⚙️ Malzeme: ${parsed.data.material}\n` : "") +
      (parsed.data.quantity ? `🔢 Adet: ${parsed.data.quantity}\n` : "") +
      (parsed.data.delivery_date ? `📅 Teslim tarihi: ${parsed.data.delivery_date}\n` : "") +
      (parsed.data.budget_range ? `💰 Bütçe: ${parsed.data.budget_range}\n` : "") +
      (fileUrl ? `📎 Dosya: ${fileUrl}\n` : "") +
      `📝 ${parsed.data.description}`
  );

  return { ok: true };
}

const preorderSchema = z.object({
  full_name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  category: z.string().min(2),
  part_detail: z.string().optional(),
  material: z.string().optional(),
  quantity: z.coerce.number().int().positive().optional(),
  preferred_date: z.string().optional(),
});

export async function submitPreorder(formData: FormData): Promise<ActionResult> {
  if (isBot(formData)) return { ok: true };

  const raw = {
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email") || "",
    category: formData.get("category"),
    part_detail: formData.get("part_detail") || "",
    material: formData.get("material") || "",
    quantity: formData.get("quantity") || undefined,
    preferred_date: formData.get("preferred_date") || "",
  };
  const parsed = preorderSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  let fileUrl: string | null = null;
  try {
    fileUrl = await uploadFile(formData.get("file") as File | null);
  } catch (err: any) {
    return { ok: false, error: err.message || "Dosya yüklenemedi." };
  }

  const db = supabaseAdmin();
  const { error } = await db.from("preorders").insert({
    full_name: parsed.data.full_name,
    phone: parsed.data.phone,
    email: parsed.data.email || null,
    category: parsed.data.category,
    part_detail: parsed.data.part_detail || null,
    material: parsed.data.material || null,
    quantity: parsed.data.quantity || null,
    preferred_date: parsed.data.preferred_date || null,
    file_url: fileUrl,
  });

  if (error) {
    console.error(error);
    return { ok: false, error: "Kaydedilirken bir hata oluştu, tekrar deneyin." };
  }

  await sendTelegramMessage(
    `📦 <b>Yeni Ön Sipariş</b>\n` +
      `👤 ${parsed.data.full_name}\n` +
      `📞 ${parsed.data.phone}\n` +
      (fileUrl ? `📎 Dosya: ${fileUrl}\n` : "") +
      `🗂 Kategori: ${parsed.data.category}\n` +
      (parsed.data.part_detail ? `🔩 Parça: ${parsed.data.part_detail}\n` : "") +
      (parsed.data.material ? `⚙️ Malzeme: ${parsed.data.material}\n` : "") +
      (parsed.data.quantity ? `🔢 Adet: ${parsed.data.quantity}\n` : "") +
      (parsed.data.preferred_date ? `📅 Tercih edilen tarih: ${parsed.data.preferred_date}` : "")
  );

  return { ok: true };
}

const commentSchema = z.object({
  name: z.string().min(2),
  message: z.string().min(5),
  rating: z.coerce.number().int().min(1).max(5),
});

export async function submitComment(formData: FormData): Promise<ActionResult> {
  if (isBot(formData)) return { ok: true };

  const parsed = commentSchema.safeParse({
    name: formData.get("name"),
    message: formData.get("message"),
    rating: formData.get("rating"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  const db = supabaseAdmin();
  const { error } = await db.from("comments").insert({
    name: parsed.data.name,
    message: parsed.data.message,
    rating: parsed.data.rating,
    approved: false,
  });

  if (error) {
    console.error(error);
    return { ok: false, error: "Kaydedilirken bir hata oluştu." };
  }

  await sendTelegramMessage(
    `💬 <b>Yeni Yorum (onay bekliyor)</b>\n${parsed.data.name}: ${parsed.data.message}`
  );

  return { ok: true };
}
