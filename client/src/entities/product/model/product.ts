import { CategoryBase } from "@/entities/category/model"
import { CollectionBase } from "@/entities/collection/model/collection"
import { DocumentId } from "@/shared/model"
import { Meta } from "@/shared/model/api"
import { Media } from "@/shared/model/media"

export type ProductBase = {
  id: DocumentId
  slug: string
  code: string
  title: string
  description: string | null
  media?: Media | null
  categories?: CategoryBase[]
  collections?: CollectionBase[]
}

export type ProductListResponse<T extends ProductBase = ProductBase> = {
  data: T[]
  meta: Meta
}

export type ProductItemResponse<T extends ProductBase = ProductBase> = {
  data: T
}
