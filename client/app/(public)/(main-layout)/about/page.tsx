import { fetchPage } from "@/entities/page/services"
import { SectionListProvider } from "@/features/sections/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { PageLayoutMain } from "@/shared/ui"
import { AboutPage } from "@/views/about/ui"
import { Metadata, Viewport } from "next"
import * as React from "react"
import slugify from "slugify"

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("О нас", { lower: true, strict: true })
  )
  const data = response.data

  return generatePageMetadata(data)
}

export async function generateViewport(): Promise<Viewport | string> {
  const response = await fetchPage(
    slugify("О нас", { lower: true, strict: true })
  )
  const data = response.data

  return generateSeoViewport(data)
}

const About = async () => {
  const content = await fetchPage(
    slugify("О нас", { lower: true, strict: true })
  )
  const sections = content.data?.sections

  return (
    <SectionListProvider initialState={{ sections }}>
      <PageLayoutMain>
        <AboutPage />
      </PageLayoutMain>
    </SectionListProvider>
  )
}

export default About
