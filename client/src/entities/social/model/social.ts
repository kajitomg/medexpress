import { StrapiBase, StrapiExtended, StrapiMedia } from "@/shared/model/strapi"

export interface Social extends StrapiBase {
  title: string
  url: string
  icon: StrapiExtended<StrapiMedia>
}
