import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
} from "@/shared/model/strapi"

export interface AboutHeroComponent
  extends StrapiComponentBase<"elements.about-hero"> {
  content: StrapiOptional<string>
  formButton: string
  poster: StrapiMedia<ImageMedia>
}
