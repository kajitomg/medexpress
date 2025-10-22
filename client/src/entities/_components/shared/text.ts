import { StrapiComponentBase } from "@/shared/model/strapi"

export interface TextComponent extends StrapiComponentBase<"shared.text"> {
  value: string
}
