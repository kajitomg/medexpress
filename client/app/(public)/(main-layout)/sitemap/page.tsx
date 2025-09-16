import { fetchPage } from "@/entities/page/services"
import { Metadata } from "next"
import slugify from "slugify"

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("Карта сайта", { lower: true, strict: true })
  )
  const data = response.data

  if (!data || !data.seo) {
    return {
      title: "Страница не найдена",
    }
  }
  const { metaTitle, metaDescription } = data.seo
  return {
    title: metaTitle,
    description: metaDescription,
  }
}

const Sitemap = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-auto">Все страницы сайта в списке</main>
    </div>
  )
}

export default Sitemap
