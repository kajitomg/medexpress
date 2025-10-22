import { SocialComponent } from "@/entities/_components/shared/social"
import {
  ImageMedia,
  StrapiComponent,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
} from "@/shared/model/strapi"

export interface FooterAboutComponent
  extends StrapiComponentBase<"elements.footer-about"> {
  logo: StrapiMedia<ImageMedia>
  caption: string
  social: StrapiOptional<StrapiComponent<SocialComponent>>
}
