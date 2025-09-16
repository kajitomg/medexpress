import { fetchGlobal } from "@/entities/global/services"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const response = await fetchGlobal()
  const data = response.data.robots
  if (!data) {
    return NextResponse.json({ status: 404 })
  }
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + data.url)
  const res = await fetch(url)
  const buf = Buffer.from(await res.arrayBuffer())

  return new NextResponse(buf, {
    headers: { "Content-Type": data.mime },
  })
}
