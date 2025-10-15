import { StrapiBase } from "@/shared/model/strapi"

export interface Currency extends StrapiBase {
  name: string
  currency: string
  localeType: string
}
