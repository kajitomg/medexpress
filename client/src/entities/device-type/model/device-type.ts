import { DeviceSectionBase } from "@/entities/device-section/model"
import { DocumentId, MetaData } from "@/shared/model"
import { StrapiMetaResponse } from "@/shared/model/strapi"

export type DeviceTypeBase = {
  id: DocumentId
  slug: string
  code: string
  name: string
  description: string | null
  sections?: DeviceSectionBase[]
  seo?: MetaData
}

export type DeviceTypeListResponse<T extends DeviceTypeBase = DeviceTypeBase> =
  {
    data: T[]
    meta: StrapiMetaResponse
  }

export type DeviceTypeItemResponse<T extends DeviceTypeBase = DeviceTypeBase> =
  {
    data: T
  }
