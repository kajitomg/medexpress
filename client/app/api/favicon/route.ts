import { fetchGlobal } from "@/entities/_single-types/global/services"
import { api } from "@/shared/api/api"
import { NextResponse } from "next/server"

export async function GET() {
  const response = await fetchGlobal()
  const data = response.data.favicon
  if (!data) {
    return NextResponse.json({ status: 404 })
  }

  const res = await api(data.url)

  return new NextResponse(res.body)
}
