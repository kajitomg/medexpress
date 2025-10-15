import { StrapiComponentBase } from "@/shared/model/strapi"

export interface RichTextComponent
  extends StrapiComponentBase<"shared.rich-text"> {
  body?: string
}
