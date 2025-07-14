import { CategoryBase } from "@/entities/category/model"
import { DocumentId } from "@/shared/model"
import { Meta } from "@/shared/model/api"
import { Media } from "@/shared/model/media"

export type ProductBase = {
  id: DocumentId
  code: string
  title: string
  description: string | null
  media?: Media | null
  categories?: CategoryBase[]
}

export type ProductListResponse<T extends ProductBase = ProductBase> = {
  data: T[]
  meta: Meta
}

export type ProductItemResponse<T extends ProductBase = ProductBase> = {
  data: T
}
