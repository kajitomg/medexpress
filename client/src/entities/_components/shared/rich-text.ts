import { StrapiComponentBase, StrapiOptional } from "@/shared/model/strapi"

export interface RichTextComponent
  extends StrapiComponentBase<"shared.rich-text"> {
  body: StrapiOptional<string>
}
