"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { sendTelegramMessage } from "@/lib/telegram";

type ActionResult = { ok: true } | { ok: false; error: string };

const quoteSchema = z.object({
  full_name: z.string().min(2, "Ad soyad gerekli"),
  phone: z.string().min(7, "Geçerli bir telefon girin"),
  email: z.string().email().optional().or(z.literal("")),
  service_type: z.string().optional(),
  description: z.string().min(10, "Lütfen işi biraz daha detaylandırın"),
});

export async function submitQuote(formData: FormData): Promise<ActionResult> {
  const parsed = quoteSchema.safeParse({
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email") || "",
    service_type: formData.get("service_type") || "",
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  const db = supabaseAdmin();
  const { error } = await db.from("quotes").insert({
    full_name: parsed.data.full_name,
    phone: parsed.data.phone,
    email: parsed.data.email || null,
    service_type: parsed.data.service_type || null,
    description: parsed.data.description,
  });

  if (error) {
    console.error(error);
    return { ok: false, error: "Kaydedilirken bir hata oluştu, tekrar deneyin." };
  }

  await sendTelegramMessage(
    `🔥 <b>Yeni Teklif Talebi</b>\n` +
      `👤 ${parsed.data.full_name}\n` +
      `📞 ${parsed.data.phone}\n` +
      (parsed.data.service_type ? `🛠 ${parsed.data.service_type}\n` : "") +
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
  });

  if (error) {
    console.error(error);
    return { ok: false, error: "Kaydedilirken bir hata oluştu, tekrar deneyin." };
  }

  await sendTelegramMessage(
    `📦 <b>Yeni Ön Sipariş</b>\n` +
      `👤 ${parsed.data.full_name}\n` +
      `📞 ${parsed.data.phone}\n` +
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
