import { MetaData } from "@/shared/model"
import { Meta } from "@/shared/model/api"
import { DocumentId } from "@/shared/model/document"
import { AboutHero } from "@/shared/model/strapi/elements/about-hero"
import { AboutInfo } from "@/shared/model/strapi/elements/about-info"
import { ContactsDetails } from "@/shared/model/strapi/elements/contacts-details"
import { MainPageHero } from "@/shared/model/strapi/elements/main-page-hero"
import { MainPageServices } from "@/shared/model/strapi/elements/main-page-services"
import { ContactFormSection } from "@/shared/model/strapi/sections/contact-form-section"
import { GallerySection } from "@/shared/model/strapi/sections/gallery-section"
import { HeroSection } from "@/shared/model/strapi/sections/hero-section"
import { ListSection } from "@/shared/model/strapi/sections/list-section"
import { ContactForm } from "@/shared/model/strapi/shared/contact-form"
import { RichText } from "@/shared/model/strapi/shared/rich-text"

export type PageSections =
  | ContactForm
  | GallerySection
  | HeroSection
  | ListSection
  | AboutHero
  | AboutInfo
  | ContactFormSection
  | ContactsDetails
  | MainPageHero
  | MainPageServices
  | RichText

export type PageBase = {
  id: DocumentId
  slug: string
  name: string
  seo: MetaData
  sections: PageSections[]
}

export type PageItemResponse<T extends PageBase = PageBase> = {
  data: T
}

export type PageListResponse<T extends PageBase = PageBase> = {
  data: T[]
  meta: Meta
}
