import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface AboutHeroComponent
  extends StrapiComponentBase<"elements.about-hero"> {
  content?: string
  formButton: string
  poster?: StrapiExtended<StrapiMedia>
}
