import { fetchPage } from "@/entities/page/services"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { Metadata, Viewport } from "next"
import * as React from "react"
import slugify from "slugify"

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("Элемент каталога", { lower: true, strict: true })
  )
  const data = response.data

  return generatePageMetadata(data)
}

export async function generateViewport(): Promise<Viewport | string> {
  const response = await fetchPage(
    slugify("Элемент каталога", { lower: true, strict: true })
  )
  const data = response.data

  return generateSeoViewport(data)
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return children
}

export default RootLayout
