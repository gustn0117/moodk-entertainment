import { cookies } from "next/headers";

const COOKIE_NAME = "moodk_admin_session";
const SESSION_TOKEN = "moodk_admin_authenticated";

export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session?.value === SESSION_TOKEN;
}

export function getSessionCookieName(): string {
  return COOKIE_NAME;
}

export function getSessionToken(): string {
  return SESSION_TOKEN;
}
