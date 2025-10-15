import { SeoComponent } from "@/entities/_components"
import {
  StrapiBase,
  StrapiComponent,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface DeviceSectionBase extends StrapiBase {
  slug: string
  code: string
  sort_code: string
  name: string
  parent?: StrapiRelation<DeviceSectionBase>
  childrens?: StrapiRelation<DeviceSectionBase[]>
  seo?: StrapiComponent<SeoComponent>
}
