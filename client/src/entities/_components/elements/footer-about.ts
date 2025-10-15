import { SocialComponent } from "@/entities/_components/shared/social"
import {
  StrapiComponent,
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface FooterAboutComponent
  extends StrapiComponentBase<"elements.footer-about"> {
  logo: StrapiExtended<StrapiMedia>
  caption: string
  social: StrapiComponent<SocialComponent>
}
