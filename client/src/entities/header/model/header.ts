import { DocumentId } from "@/shared/model/document"
import { PageSections } from "@/shared/model/strapi"

export type HeaderBase = {
  id: DocumentId
  sections: PageSections[]
}

export type HeaderItemResponse<T extends HeaderBase = HeaderBase> = {
  data: T
}
