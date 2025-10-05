import { CategoryBase } from "@/entities/category/model"
import { DeviceTypeBase } from "@/entities/device-type/model"
import { DocumentId } from "@/shared/model"
import { Media } from "@/shared/model/media"
import { StrapiMetaResponse } from "@/shared/model/strapi"

export type ProductBase = {
  id: DocumentId
  slug: string
  code: string
  name: string
  description: string | null
  price?: null
  images?: Media[]
  type?: DeviceTypeBase
  categories?: CategoryBase[]
  specifications: unknown[]
}

export type ProductListResponse<T extends ProductBase = ProductBase> = {
  data: T[]
  meta: StrapiMetaResponse
}

export type ProductItemResponse<T extends ProductBase = ProductBase> = {
  data: T
}
