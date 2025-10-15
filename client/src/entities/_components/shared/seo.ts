import { OpenGraphComponent } from "@/entities/_components/shared/open-graph"
import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface SeoComponent extends StrapiComponentBase<"shared.seo"> {
  metaTitle: string
  metaTitleTemplate?: string
  metaDescription: string
  metaImage?: StrapiExtended<StrapiMedia>
  openGraph?: StrapiRelation<OpenGraphComponent>
  keywords?: string | null
  metaRobots?: string | null
  metaViewport?: string | null
  canonicalURL?: string | null
  structuredData?: Record<string, unknown> | null
}
