import { ProductBase } from "@/entities/product/model"
import { MetaData } from "@/shared/model"
import { DocumentId } from "@/shared/model/document"
import { Media } from "@/shared/model/media"
import { StrapiMetaResponse } from "@/shared/model/strapi"

export type CategoryBase = {
  id: DocumentId
  slug: string
  name: string
  image?: Media | null
  products?: ProductBase[] | null
  seo?: MetaData
}

export type CategoryListResponse<T extends CategoryBase = CategoryBase> = {
  data: T[]
  meta: StrapiMetaResponse
}

export type CategoryItemResponse<T extends CategoryBase = CategoryBase> = {
  data: T
}
