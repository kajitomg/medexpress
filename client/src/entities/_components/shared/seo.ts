import { OpenGraphComponent } from "@/entities/_components/shared/open-graph"
import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface SeoComponent extends StrapiComponentBase<"shared.seo"> {
  metaTitle: string
  metaDescription: string
  metaImage: StrapiOptional<StrapiMedia<ImageMedia>>
  openGraph: StrapiOptional<StrapiRelation<OpenGraphComponent>>
  keywords: StrapiOptional<string>
  metaRobots: StrapiOptional<string>
  metaViewport: StrapiOptional<string>
  canonicalURL: StrapiOptional<string>
  structuredData: StrapiOptional<Record<string, unknown>>
}
