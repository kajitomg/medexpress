import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface MainPageServicesComponent
  extends StrapiComponentBase<"elements.main-page-services"> {
  title: string
  contactButton: string
  backgroundImage?: StrapiExtended<StrapiMedia>
}
