import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface RowTextItemComponent
  extends StrapiComponentBase<"blocks.row-text-item"> {
  title?: string
  content: string
  icon?: StrapiExtended<StrapiMedia>
}
