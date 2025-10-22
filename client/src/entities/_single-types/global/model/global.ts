import { SeoComponent } from "@/entities/_components"
import {
  DocumentMedia,
  ImageMedia,
  StrapiBase,
  StrapiComponent,
  StrapiMedia,
  StrapiOptional,
} from "@/shared/model/strapi"

export interface GlobalBase extends StrapiBase {
  slug: string
  seo: StrapiOptional<StrapiComponent<SeoComponent>>
  robots: StrapiOptional<StrapiMedia<DocumentMedia>>
  favicon: StrapiOptional<StrapiMedia<DocumentMedia>>
  sitemap: StrapiOptional<StrapiMedia<DocumentMedia>>
  defaultCategoryImage: StrapiOptional<StrapiMedia<ImageMedia>>
  defaultProductImage: StrapiOptional<StrapiMedia<ImageMedia>>
  defaultCollectionImage: StrapiOptional<StrapiMedia<ImageMedia>>
}
