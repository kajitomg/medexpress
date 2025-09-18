import { fetchGlobal } from "@/entities/global/services"
import { NextResponse } from "next/server"

export async function GET() {
  const response = await fetchGlobal()
  const data = response.data.favicon
  if (!data) {
    return NextResponse.json({ status: 404 })
  }

  const url = new URL(process.env.NEXT_PUBLIC_API_URL + data.url)
  const res = await fetch(url)

  return new NextResponse(res.body)
}
