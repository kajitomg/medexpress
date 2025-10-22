import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface LogoComponent extends StrapiComponentBase<"layout.logo"> {
  name: string
  image: StrapiMedia<ImageMedia>
}
