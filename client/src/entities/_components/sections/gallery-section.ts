import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface GallerySectionComponent
  extends StrapiComponentBase<"sections.gallery-section"> {
  title: string
  items?: StrapiExtended<StrapiMedia[]>
}
