import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
} from "@/shared/model/strapi"

export interface OpenGraphComponent
  extends StrapiComponentBase<"shared.open-graph"> {
  ogTitle: string
  ogDescription: string
  ogUrl: StrapiOptional<string>
  ogType: StrapiOptional<string>
  ogImage: StrapiOptional<StrapiMedia<ImageMedia>>
}
