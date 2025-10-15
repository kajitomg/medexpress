import { ProductSpecificationComponent } from "@/entities/_components"
import { CategoryBase } from "@/entities/category/model"
import { DeviceTypeBase } from "@/entities/device-type/model"
import { Price } from "@/entities/price/model"
import {
  StrapiBase,
  StrapiExtended,
  StrapiMedia,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface ProductBase extends StrapiBase {
  slug: string
  name: string
  description: string | null
  price?: StrapiRelation<Price[]>
  images?: StrapiExtended<StrapiMedia[]>
  type?: StrapiRelation<DeviceTypeBase>
  categories?: StrapiRelation<CategoryBase[]>
  specifications?: StrapiRelation<ProductSpecificationComponent[]>
}
