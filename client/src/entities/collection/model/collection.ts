import { ProductBase } from "@/entities/product/model"
import { Meta } from "@/shared/model/api"
import { DocumentId } from "@/shared/model/document"
import { Media } from "@/shared/model/media"

export type CollectionBase = {
  id: DocumentId
  title: string
  description: string | null
  media?: Media | null
  products?: ProductBase[] | null
}

export type CollectionListResponse<T extends CollectionBase = CollectionBase> =
  {
    data: T[]
    meta: Meta
  }

export type CollectionItemResponse<T extends CollectionBase = CollectionBase> =
  {
    data: T
  }
