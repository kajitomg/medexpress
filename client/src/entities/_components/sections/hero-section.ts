import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
} from "@/shared/model/strapi"

export interface HeroSectionComponent
  extends StrapiComponentBase<"sections.hero"> {
  title: string
  picture: StrapiOptional<StrapiMedia<ImageMedia>>
}
