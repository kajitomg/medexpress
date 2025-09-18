import { revalidatePath, revalidateTag } from "next/cache"

const STRAPI_SECRET = process.env.STRAPI_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const secret = req.headers.get("x-strapi-secret")
    if (secret !== STRAPI_SECRET) {
      return new Response(JSON.stringify({ message: "Invalid secret" }), {
        status: 401,
      })
    }

    const slug = body?.entry?.slug ?? null

    if (slug) {
      revalidateTag(`${slug}`)
      return Response.json({ revalidated: true })
    } else {
      revalidatePath("*")
      return Response.json({ revalidated: true, path: "/*" })
    }
  } catch {
    return new Response(JSON.stringify({ message: "Error revalidating" }), {
      status: 500,
    })
  }
}
