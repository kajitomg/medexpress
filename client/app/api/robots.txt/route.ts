import { fetchSettings } from "@/entities/settings/services"
import { NextResponse } from "next/server"

export async function GET() {
  const response = await fetchSettings()
  const data = response.data
  if (!data.robots_txt.url) {
    return NextResponse.json({ status: 404 })
  }
  return NextResponse.redirect(
    new URL(data.robots_txt.url, process.env.NEXT_PUBLIC_APP_URL)
  )
}
