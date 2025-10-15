import { SeoComponent } from "@/entities/_components"
import {
  StrapiBase,
  StrapiComponent,
  StrapiExtended,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface GlobalBase extends StrapiBase {
  slug: string
  seo: StrapiComponent<SeoComponent>
  robots: StrapiExtended<StrapiMedia>
  favicon: StrapiExtended<StrapiMedia>
  sitemap: StrapiExtended<StrapiMedia>
  defaultCategoryImage: StrapiExtended<StrapiMedia>
  defaultProductImage: StrapiExtended<StrapiMedia>
  defaultCollectionImage: StrapiExtended<StrapiMedia>
}
