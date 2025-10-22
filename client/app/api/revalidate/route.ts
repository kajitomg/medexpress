import { CategoryBase } from "@/entities/category/model"
import { DeviceTypeBase } from "@/entities/device-type/model"
import { ProductBase } from "@/entities/product/model"
import { revalidateTag } from "next/cache"

const STRAPI_SECRET = process.env.STRAPI_WEBHOOK_SECRET

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const secret = req.headers.get("x-strapi-secret")
    if (secret !== STRAPI_SECRET) {
      return new Response(JSON.stringify({ message: "Invalid secret" }), {
        status: 401,
      })
    }

    if (!body.model) {
      return new Response(JSON.stringify({ message: "Invalid model" }), {
        status: 401,
      })
    }

    switch (body.model) {
      case "device-type": {
        const deviceType = body.entry as DeviceTypeBase

        revalidateTag(body.model)

        deviceType.sections?.map((section) => {
          revalidateTag(`device-section::${section?.slug}`)
        })

        break
      }
      case "device-section": {
        revalidateTag(body.model)

        break
      }
      case "category": {
        const category = body.entry as CategoryBase

        revalidateTag(body.model)
        category?.products?.map((product) => {
          revalidateTag(`product::${product?.slug}`)
        })
        break
      }
      case "product": {
        const product = body.entry as ProductBase

        revalidateTag(`product::${product?.slug}`)
        product?.categories?.map((category) => {
          revalidateTag(`category::${category?.slug}`)
        })

        break
      }
      case "page": {
        const slug = body?.entry?.slug ?? null
        if (!slug) {
          revalidateTag(body.model)
          break
        }
        revalidateTag(body.model)
        revalidateTag(`page::${slug}`)
        break
      }
      default: {
        revalidateTag(body.model)
        break
      }
    }

    return Response.json({ revalidated: true })
  } catch {
    return new Response(JSON.stringify({ message: "Error revalidating" }), {
      status: 500,
    })
  }
}
