import { MetaData } from "@/shared/model"
import { DocumentId } from "@/shared/model/document"
import { Media } from "@/shared/model/media"

export type GlobalBase = {
  id: DocumentId
  seo: MetaData
  robots: Media
  favicon: Media
  sitemap: Media
  defaultCategoryImage: Media
  defaultProductImage: Media
  defaultCollectionImage: Media
}

export type GlobalItemResponse<T extends GlobalBase = GlobalBase> = {
  data: T
}
