import { DocumentId } from "@/shared/model"
import { Media } from "@/shared/model/media"

export type ProductBase = {
  id: DocumentId
  code: string
  title: string
  description: string | null
  media?: Media | null
  categories?: ProductBase[]
}

export type ProductListResponse<T extends ProductBase = ProductBase> = {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      total: number
      pageCount: number
    }
  }
}

export type ProductItemResponse<T extends ProductBase = ProductBase> = {
  data: T
}
