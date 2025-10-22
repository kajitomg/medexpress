import { SeoComponent } from "@/entities/_components"
import { ProductBase } from "@/entities/product/model"
import {
  ImageMedia,
  StrapiBase,
  StrapiComponent,
  StrapiMedia,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface CategoryBase extends StrapiBase {
  slug: string
  name: string
  image: StrapiOptional<StrapiMedia<ImageMedia>>
  products: StrapiOptional<StrapiRelation<ProductBase[]>>
  seo: StrapiOptional<StrapiComponent<SeoComponent>>
}
