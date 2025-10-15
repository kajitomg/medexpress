import { StrapiComponentBase } from "@/shared/model/strapi"

export interface SeoTemplateComponent
  extends StrapiComponentBase<"shared.seo-template"> {
  metaTitleTemplate?: string
}
