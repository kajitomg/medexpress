import { fetchGlobal } from "@/entities/global/services"
import { NextResponse } from "next/server"

export async function GET() {
  const response = await fetchGlobal()
  const data = response.data.favicon
  if (!data) {
    return NextResponse.json({ status: 404 })
  }

  const url = new URL(data.url, process.env.NEXT_PUBLIC_API_URL)
  const res = await fetch(url)
  const buf = Buffer.from(await res.arrayBuffer())

  return new NextResponse(buf, {
    headers: { "Content-Type": data.mime },
  })
}
