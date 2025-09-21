import { ProductBase } from "@/entities/product/model"
import { MetaData } from "@/shared/model"
import { Meta } from "@/shared/model/api"
import { DocumentId } from "@/shared/model/document"
import { Media } from "@/shared/model/media"

export type CategoryBase = {
  id: DocumentId
  slug: string
  code: string
  title: string
  description?: string
  media?: Media
  parent?: CategoryBase
  childrens?: CategoryBase[]
  products?: ProductBase[]
  seo?: MetaData
}

export type CategoryListResponse<T extends CategoryBase = CategoryBase> = {
  data: T[]
  meta: Meta
}

export type CategoryItemResponse<T extends CategoryBase = CategoryBase> = {
  data: T
}
