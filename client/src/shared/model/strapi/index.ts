import { AboutHero } from "@/shared/model/strapi/elements/about-hero"
import { AboutInfo } from "@/shared/model/strapi/elements/about-info"
import { ContactsDetails } from "@/shared/model/strapi/elements/contacts-details"
import { FooterAbout } from "@/shared/model/strapi/elements/footer-about"
import { FooterContacts } from "@/shared/model/strapi/elements/footer-contacts"
import { HeaderContacts } from "@/shared/model/strapi/elements/header-contacts"
import { MainPageHero } from "@/shared/model/strapi/elements/main-page-hero"
import { MainPageServices } from "@/shared/model/strapi/elements/main-page-services"
import { ContactFormSection } from "@/shared/model/strapi/sections/contact-form-section"
import { GallerySection } from "@/shared/model/strapi/sections/gallery-section"
import { HeroSection } from "@/shared/model/strapi/sections/hero-section"
import { ListSection } from "@/shared/model/strapi/sections/list-section"
import { ContactForm } from "@/shared/model/strapi/shared/contact-form"
import { RichText } from "@/shared/model/strapi/shared/rich-text"

export type ExtractByComponent<T extends PageSections["__component"]> = Extract<
  PageSections,
  { __component: T }
>

export type PageSections =
  | ContactForm
  | GallerySection
  | HeroSection
  | ListSection
  | AboutHero
  | AboutInfo
  | ContactFormSection
  | ContactsDetails
  | FooterAbout
  | FooterContacts
  | HeaderContacts
  | MainPageHero
  | MainPageServices
  | RichText
