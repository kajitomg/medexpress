import { fetchPage } from "@/entities/page/services"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import {
  PageHero,
  PageHeroContent,
  PageLayoutMain,
  Typography,
} from "@/shared/ui"
import { Metadata, Viewport } from "next"
import * as React from "react"
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
    <PageLayoutMain>
      <PageHero height="full">
        <PageHeroContent className="flex justify-center items-center">
          <Typography asChild variant="h2">
            <h2>Страница в разработке</h2>
          </Typography>
        </PageHeroContent>
      </PageHero>
    </PageLayoutMain>
  )
}

export default Sitemap
