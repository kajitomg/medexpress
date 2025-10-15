import { SeoComponent } from "@/entities/_components"
import { DeviceSectionBase } from "@/entities/device-section/model"
import {
  StrapiBase,
  StrapiComponent,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface DeviceTypeBase extends StrapiBase {
  slug: string
  code: string
  name: string
  description: string | null
  sections?: StrapiRelation<DeviceSectionBase[]>
  seo?: StrapiComponent<SeoComponent>
}
