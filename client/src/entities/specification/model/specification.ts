import { StrapiBase } from "@/shared/model/strapi"

export interface Specification extends StrapiBase {
  name: string
  type: "text" | "number" | "boolean" | "list"
  units: string
}
