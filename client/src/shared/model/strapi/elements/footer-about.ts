import { Logo } from "@/shared/model/strapi/layout/logo"
import { Social } from "@/shared/model/strapi/shared/social"

export type FooterAbout = {
  __component: "elements.footer-about"
  logo: Logo
  caption: string
  social: Social
}
