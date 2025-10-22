import {
  ProductSpecificationComponent,
  SeoComponent,
} from "@/entities/_components"
import { CategoryBase } from "@/entities/category/model"
import { DeviceTypeBase } from "@/entities/device-type/model"
import { Price } from "@/entities/price/model"
import {
  ImageMedia,
  StrapiBase,
  StrapiComponent,
  StrapiMedia,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface ProductBase extends StrapiBase {
  slug: string
  sku: string
  name: string
  description: string
  specifications: StrapiOptional<
    StrapiRelation<ProductSpecificationComponent[]>
  >
  price: StrapiOptional<StrapiRelation<Price[]>>
  images: StrapiOptional<StrapiMedia<ImageMedia[]>>
  type: StrapiOptional<StrapiRelation<DeviceTypeBase>>
  categories: StrapiOptional<StrapiRelation<CategoryBase[]>>
  seo: StrapiOptional<StrapiComponent<SeoComponent>>
}
