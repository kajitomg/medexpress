import { DocumentId } from "@/shared/model/document"
import { PageSections } from "@/shared/model/strapi"

export type FooterBase = {
  id: DocumentId
  sections: PageSections[]
}

export type FooterItemResponse<T extends FooterBase = FooterBase> = {
  data: T
}
