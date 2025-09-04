import { fetchSettings } from "@/entities/settings/services"

export async function GET() {
  const response = await fetchSettings()

  const data = response.data

  return new Response(data.robots_txt.url, {
    headers: { "Content-Type": "text/plain" },
  })
}
