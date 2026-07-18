import { createClient } from "@supabase/supabase-js";

/**
 * Next.js App Router, fetch isteklerini varsayılan olarak cache'leyebilir.
 * Supabase sorgularının her zaman güncel veri döndürmesi için cache'i
 * açıkça kapatıyoruz (force-dynamic tek başına bunu her durumda garanti etmez).
 */
const noStoreFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" });

/** Herkese açık okuma / form gönderimi için (RLS kurallarına tabidir) */
export function supabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  if (!url || !anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY tanımlı değil. Vercel > Settings > Environment Variables kısmını kontrol edin."
    );
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false },
    global: { fetch: noStoreFetch },
  });
}

/**
 * Sadece sunucu tarafında (server actions / route handlers) kullanılır.
 * Service role key RLS'yi bypass eder, ASLA istemciye (browser) gönderilmemelidir.
 */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  if (!url || !serviceKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY tanımlı değil. Vercel > Settings > Environment Variables kısmını kontrol edin."
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
    global: { fetch: noStoreFetch },
  });
}
