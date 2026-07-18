"use server";

import { cookies } from "next/headers";
import { createAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/session";

export async function adminLogin(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const validUser = process.env.ADMIN_USERNAME || "admin";
  const validPass = process.env.ADMIN_PASSWORD || "123";

  if (username !== validUser || password !== validPass) {
    return { ok: false, error: "Kullanıcı adı veya şifre hatalı." };
  }

  const token = await createAdminSessionToken(username);
  cookies().set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 saat
  });

  return { ok: true };
}

export async function adminLogout() {
  cookies().delete(ADMIN_COOKIE_NAME);
}
