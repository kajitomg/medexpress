import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface LogoComponent extends StrapiComponentBase<"layout.logo"> {
  name: string
  image?: StrapiExtended<StrapiMedia>
}
