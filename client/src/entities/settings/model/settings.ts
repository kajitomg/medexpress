import { DocumentId } from "@/shared/model/document"
import { Media } from "@/shared/model/media"

export type SettingsBase = {
  id: DocumentId
  category_default_media: Media
  product_default_media: Media
  collection_default_media: Media
  robots_txt: Media
}

export type SettingsItemResponse<T extends SettingsBase = SettingsBase> = {
  data: T
}
