import {
  AboutHeroComponent,
  AboutInfoComponent,
  ContactFormComponent,
  ContactFormSectionComponent,
  ContactsDetailsComponent,
  GallerySectionComponent,
  HeroSectionComponent,
  ListSectionComponent,
  MainPageHeroComponent,
  MainPageServicesComponent,
  RichTextComponent,
  SeoComponent,
  SeoTemplateComponent,
} from "@/entities/_components"
import {
  StrapiBase,
  StrapiComponent,
  StrapiDynamicZone,
  StrapiOptional,
} from "@/shared/model/strapi"

export type PageSections =
  | ContactFormComponent
  | GallerySectionComponent
  | HeroSectionComponent
  | ListSectionComponent
  | AboutHeroComponent
  | AboutInfoComponent
  | ContactFormSectionComponent
  | ContactsDetailsComponent
  | MainPageHeroComponent
  | MainPageServicesComponent
  | RichTextComponent

export interface PageBase extends StrapiBase {
  slug: string
  name: string
  seo: StrapiComponent<SeoComponent>
  sections: StrapiOptional<StrapiDynamicZone<PageSections>>
  seoTemplate: StrapiOptional<StrapiComponent<SeoTemplateComponent>>
}
