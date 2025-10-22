import { ImageMedia, StrapiBase, StrapiMedia } from "@/shared/model/strapi"

export interface Social extends StrapiBase {
  title: string
  url: string
  icon: StrapiMedia<ImageMedia>
}
