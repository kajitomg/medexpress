import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
} from "@/shared/model/strapi"

export interface RowTextItemComponent
  extends StrapiComponentBase<"blocks.row-text-item"> {
  title: StrapiOptional<string>
  content: string
  icon: StrapiOptional<StrapiMedia<ImageMedia>>
}
