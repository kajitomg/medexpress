import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface OpenGraphComponent
  extends StrapiComponentBase<"shared.open-graph"> {
  ogTitle?: string | null
  ogDescription?: string | null
  ogUrl?: string | null
  ogType?: string | null
  ogImage?: StrapiExtended<StrapiMedia>
}
