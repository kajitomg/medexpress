import { headers } from "next/headers"

export async function getBaseUrl() {
  try {
    const h = await headers()
    const proto =
      h.get("x-forwarded-proto") ??
      (process.env.NODE_ENV === "production" ? "https" : "http")
    const host = h.get("x-forwarded-host") ?? h.get("host")
    if (host) return `${proto}://${host}`
  } catch {}
  return process.env.CLIENT_URL ?? "http://localhost:3000"
}
