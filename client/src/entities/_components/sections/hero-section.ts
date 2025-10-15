import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface HeroSectionComponent
  extends StrapiComponentBase<"sections.hero"> {
  title: string
  description: string
  picture?: StrapiExtended<StrapiMedia>
}
