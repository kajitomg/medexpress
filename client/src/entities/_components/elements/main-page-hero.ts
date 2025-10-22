import { StrapiComponentBase, StrapiOptional } from "@/shared/model/strapi"

export interface MainPageHeroComponent
  extends StrapiComponentBase<"elements.main-page-hero"> {
  display: string
  formTitle: string
  formInput: string
  formButton: StrapiOptional<string>
}
