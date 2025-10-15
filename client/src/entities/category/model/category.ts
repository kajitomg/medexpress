import { SeoComponent } from "@/entities/_components"
import { ProductBase } from "@/entities/product/model"
import {
  StrapiBase,
  StrapiComponent,
  StrapiExtended,
  StrapiMedia,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface CategoryBase extends StrapiBase {
  slug: string
  name: string
  image?: StrapiExtended<StrapiMedia>
  products?: StrapiRelation<ProductBase[]>
  seo?: StrapiComponent<SeoComponent>
}
