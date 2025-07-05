import { DocumentId } from "@/shared/model/document"
import { Media } from "@/shared/model/media"

export type CategoryBase = {
  id: DocumentId
  code: string
  title: string
  description: string | null
  media?: Media | null
  parent?: CategoryBase | null
}

export type CategoryOptions = {
  childrens: CategoryBase[]
}

export type CategoryListResponse<T extends CategoryBase = CategoryBase> = {
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

export type CategoryItemResponse<T extends CategoryBase = CategoryBase> = {
  data: T
}
