import { Media } from "@/shared/model/media"

interface OpenGraph {
  id: number
  ogTitle?: string | null
  ogDescription?: string | null
  ogUrl?: string | null
  ogType?: string | null
  ogImage?: Media
}

/**
 * Основная типизация для вашего кастомного SEO-компонента
 */
export interface MetaData {
  id: number

  metaTitle: string

  metaTitleTemplate?: string

  metaDescription: string

  metaImage?: Media

  openGraph?: OpenGraph | null

  keywords?: string | null

  metaRobots?: string | null

  metaViewport?: string | null

  canonicalURL?: string | null

  structuredData?: Record<string, unknown> | null
}
