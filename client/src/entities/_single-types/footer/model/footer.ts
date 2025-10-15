import {
  FooterAboutComponent,
  FooterContactsComponent,
} from "@/entities/_components"
import { StrapiBase, StrapiDynamicZone } from "@/shared/model/strapi"

export type FooterSections = FooterAboutComponent | FooterContactsComponent

export interface FooterBase extends StrapiBase {
  slug: string
  sections: StrapiDynamicZone<FooterSections>
}
