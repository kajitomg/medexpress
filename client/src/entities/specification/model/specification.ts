import { PluralizationComponent } from "@/entities/_components/shared/pluralization"
import { StrapiBase, StrapiComponent } from "@/shared/model/strapi"

export type SpecificationTypes = "text" | "number" | "boolean" | "list"

export interface Specification extends StrapiBase {
  name: string
  type: "text" | "number" | "boolean" | "list"
  units: StrapiComponent<PluralizationComponent>
}
