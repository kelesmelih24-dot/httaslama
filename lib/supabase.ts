import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

/** Herkese açık okuma / form gönderimi için (RLS kurallarına tabidir) */
export const supabasePublic = createClient(url, anonKey, {
  auth: { persistSession: false },
});

/**
 * Sadece sunucu tarafında (server actions / route handlers) kullanılır.
 * Service role key RLS'yi bypass eder, ASLA istemciye (browser) gönderilmemelidir.
 */
export function supabaseAdmin() {
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY tanımlı değil. .env dosyasını kontrol edin."
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
