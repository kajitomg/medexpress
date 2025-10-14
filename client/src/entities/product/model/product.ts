import { CategoryBase } from "@/entities/category/model"
import { DeviceTypeBase } from "@/entities/device-type/model"
import { DocumentId, DocumentServices } from "@/shared/model"
import { Media } from "@/shared/model/media"
import { StrapiMetaResponse } from "@/shared/model/strapi"

export type Currency = {
  id: DocumentId
  name: string
  currency: string
  localeType: string
}

export type Price = {
  id: DocumentId
  price: number
  direction: "FROM" | "CURRENT"
  currency: Currency
  priceStatus: "AVAILABLE" | "NOT SPECIFIED" | "ON REQUEST"
} & DocumentServices

export type Specification = {
  id: DocumentId
  name: string
  type: "text" | "number" | "boolean" | "list"
  units: string
}

export type ProductSpecification = {
  id: DocumentId
  label: string
  type: Specification
  bodyText?: string
  bodyBoolean?: boolean
  bodyNumber?: number
  bodyList?: { value: string }[]
}

export type ProductBase = {
  id: DocumentId
  slug: string
  name: string
  description: string | null
  price?: Price[] | null
  images?: Media[]
  type?: DeviceTypeBase
  categories?: CategoryBase[]
  specifications: ProductSpecification[]
}

export type ProductListResponse<T extends ProductBase = ProductBase> = {
  data: T[]
  meta: StrapiMetaResponse
}

export type ProductItemResponse<T extends ProductBase = ProductBase> = {
  data: T
}
