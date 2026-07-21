"use server";

import { supabaseAdmin } from "@/lib/supabase";

type PushSubscriptionJSON = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

export async function subscribeToPush(sub: PushSubscriptionJSON) {
  const db = supabaseAdmin();
  const { error } = await db.from("push_subscriptions").upsert(
    {
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
    },
    { onConflict: "endpoint" }
  );
  if (error) {
    console.error("Push aboneliği kaydedilemedi:", error);
    return { ok: false };
  }
  return { ok: true };
}

export async function unsubscribeFromPush(endpoint: string) {
  const db = supabaseAdmin();
  await db.from("push_subscriptions").delete().eq("endpoint", endpoint);
  return { ok: true };
}
