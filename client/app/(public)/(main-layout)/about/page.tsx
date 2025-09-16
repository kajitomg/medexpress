import { fetchPage } from "@/entities/page/services"
import { PageProvider } from "@/features/page/provider"
import { AboutPage } from "@/views/about/ui"
import { Metadata } from "next"
import * as React from "react"
import slugify from "slugify"

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("О нас", { lower: true, strict: true })
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

const About = async () => {
  const response = await fetchPage(
    slugify("О нас", { lower: true, strict: true })
  )
  const data = response.data

  return (
    <PageProvider initialState={{ sections: data.sections }}>
      <AboutPage />
    </PageProvider>
  )
}

export default About
