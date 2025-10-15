import { StrapiComponentBase } from "@/shared/model/strapi"

export interface ContactFormComponent
  extends StrapiComponentBase<"shared.contact-form"> {
  title: string
  caption: string
}
