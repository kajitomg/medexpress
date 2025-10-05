import { MetaData } from "@/shared/model"
import { DocumentId } from "@/shared/model/document"
import { StrapiMetaResponse } from "@/shared/model/strapi"

export type DeviceSectionBase = {
  id: DocumentId
  slug: string
  code: string
  sort_code: string
  name: string
  parent?: DeviceSectionBase
  childrens?: DeviceSectionBase[]
  seo?: MetaData
}

export type DeviceSectionListResponse<
  T extends DeviceSectionBase = DeviceSectionBase,
> = {
  data: T[]
  meta: StrapiMetaResponse
}

export type DeviceSectionItemResponse<
  T extends DeviceSectionBase = DeviceSectionBase,
> = {
  data: T
}
