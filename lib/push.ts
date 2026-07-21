import webpush from "web-push";
import { supabaseAdmin } from "@/lib/supabase";

let configured = false;

function ensureConfigured() {
  if (configured) return;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:info@htmakinataslama.com";

  if (!publicKey || !privateKey) {
    throw new Error("VAPID anahtarları tanımlı değil (NEXT_PUBLIC_VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY).");
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
}

/**
 * Kayıtlı tüm admin cihazlarına anlık bildirim gönderir.
 * Bir abonelik artık geçersizse (kullanıcı bildirimleri kapattı, tarayıcı
 * verisini sildi vb.) o kaydı veritabanından otomatik olarak temizler.
 */
export async function notifyAdmins(title: string, body: string, url = "/yonetim") {
  try {
    ensureConfigured();
  } catch (err) {
    console.warn("Push bildirimi atlandı:", (err as Error).message);
    return;
  }

  const db = supabaseAdmin();
  const { data: subs } = await db.from("push_subscriptions").select("*");
  if (!subs || subs.length === 0) return;

  const payload = JSON.stringify({ title, body, url });

  await Promise.all(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payload
        );
      } catch (err: any) {
        // 404/410: abonelik artık geçerli değil, temizle
        if (err?.statusCode === 404 || err?.statusCode === 410) {
          await db.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
        } else {
          console.error("Push gönderim hatası:", err?.message || err);
        }
      }
    })
  );
}
