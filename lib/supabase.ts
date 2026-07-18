import { createClient } from "@supabase/supabase-js";

/** Herkese açık okuma / form gönderimi için (RLS kurallarına tabidir) */
export function supabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  if (!url || !anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY tanımlı değil. Vercel > Settings > Environment Variables kısmını kontrol edin."
    );
  }
  return createClient(url, anonKey, { auth: { persistSession: false } });
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
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
