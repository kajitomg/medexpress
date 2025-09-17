import { DocumentId } from "@/shared/model/document"
import { HeaderContacts } from "@/shared/model/strapi/elements/header-contacts"
import { Logo } from "@/shared/model/strapi/layout/logo"

export type HeaderSections = HeaderContacts | Logo

export type HeaderBase = {
  id: DocumentId
  sections: HeaderSections[]
}

export type HeaderItemResponse<T extends HeaderBase = HeaderBase> = {
  data: T
}
