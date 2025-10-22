import { StrapiComponentBase, StrapiOptional } from "@/shared/model/strapi"

export interface SeoTemplateComponent
  extends StrapiComponentBase<"shared.seo-template"> {
  metaTitle: string
  metaTitleTemplate: StrapiOptional<string>
}
