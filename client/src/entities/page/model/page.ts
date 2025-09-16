import { MetaData } from "@/shared/model"
import { Meta } from "@/shared/model/api"
import { DocumentId } from "@/shared/model/document"
import { PageSections } from "@/shared/model/strapi"

export type PageBase = {
  id: DocumentId
  slug: string
  name: string
  seo: MetaData
  sections: PageSections[]
}

export type PageItemResponse<T extends PageBase = PageBase> = {
  data: T
}

export type PageListResponse<T extends PageBase = PageBase> = {
  data: T[]
  meta: Meta
}
