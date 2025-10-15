import { HeaderContactsComponent, LogoComponent } from "@/entities/_components"
import { StrapiBase, StrapiDynamicZone } from "@/shared/model/strapi"

export type HeaderSections = HeaderContactsComponent | LogoComponent

export interface HeaderBase extends StrapiBase {
  slug: string
  sections: StrapiDynamicZone<HeaderSections>
}
