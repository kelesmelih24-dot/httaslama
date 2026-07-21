import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/session";

function normalizeHost(host: string) {
  return host.replace(/^www\./, "").toLowerCase();
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = normalizeHost(req.headers.get("host") || "");

  // ADMIN_DOMAIN: yönetim paneli için ayrılan alan adı (örn. htmakinataslama.online)
  const adminDomain = process.env.ADMIN_DOMAIN ? normalizeHost(process.env.ADMIN_DOMAIN) : null;
  // NEXT_PUBLIC_SITE_URL: herkese açık ana site (örn. htmakinataslama.com)
  const publicDomain = process.env.NEXT_PUBLIC_SITE_URL
    ? normalizeHost(new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname)
    : null;

  const isAdminDomain = Boolean(adminDomain && host === adminDomain);
  const isPublicDomain = Boolean(publicDomain && host === publicDomain);

  // Yönetim alan adında: kök dahil her yol otomatik /yonetim'e yönlenir
  if (isAdminDomain && !pathname.startsWith("/yonetim")) {
    return NextResponse.redirect(new URL("/yonetim", req.url));
  }

  // Herkese açık (asıl) alan adında: /yonetim tamamen erişilemez, anasayfaya yönlenir
  if (isPublicDomain && pathname.startsWith("/yonetim")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isLoginPage = pathname === "/yonetim/giris";
  const isProtected = pathname.startsWith("/yonetim") && !isLoginPage;

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = token ? await verifyAdminSessionToken(token) : null;

  if (!session) {
    const loginUrl = new URL("/yonetim/giris", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|og-image.png|logo-icon.png).*)"],
};
