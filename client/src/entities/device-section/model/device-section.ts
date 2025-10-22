import { SeoComponent } from "@/entities/_components"
import {
  StrapiBase,
  StrapiComponent,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface DeviceSectionBase extends StrapiBase {
  slug: string
  code: string
  sort_code: string
  name: string
  parent: StrapiOptional<StrapiRelation<DeviceSectionBase>>
  childrens: StrapiOptional<StrapiRelation<DeviceSectionBase[]>>
  seo: StrapiOptional<StrapiComponent<SeoComponent>>
}
