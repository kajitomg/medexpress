import { fetchPage } from "@/entities/page/services"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { Metadata, Viewport } from "next"
import slugify from "slugify"

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("Карта сайта", { lower: true, strict: true })
  )
  const data = response.data

  return generatePageMetadata(data)
}

export async function generateViewport(): Promise<Viewport | string> {
  const response = await fetchPage(
    slugify("Карта сайта", { lower: true, strict: true })
  )
  const data = response.data

  return generateSeoViewport(data)
}

const Sitemap = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-auto">Все страницы сайта в списке</main>
    </div>
  )
}

export default Sitemap
