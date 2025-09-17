import { DocumentId } from "@/shared/model/document"
import { FooterAbout } from "@/shared/model/strapi/elements/footer-about"
import { FooterContacts } from "@/shared/model/strapi/elements/footer-contacts"

export type FooterSections = FooterAbout | FooterContacts

export type FooterBase = {
  id: DocumentId
  sections: FooterSections[]
}

export type FooterItemResponse<T extends FooterBase = FooterBase> = {
  data: T
}
