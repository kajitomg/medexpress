import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
} from "@/shared/model/strapi"

export interface GallerySectionComponent
  extends StrapiComponentBase<"sections.gallery-section"> {
  title: StrapiOptional<string>
  items: StrapiOptional<StrapiMedia<ImageMedia[]>>
}
