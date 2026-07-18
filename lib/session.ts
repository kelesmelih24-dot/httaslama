import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "ht_admin_session";
const ALG = "HS256";

function secretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET tanımlı değil.");
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken(username: string) {
  return await new SignJWT({ role: "admin", username })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey());
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
