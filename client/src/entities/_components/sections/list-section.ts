import { RowTextItemComponent } from "@/entities/_components/blocks/row-text-item"
import {
  StrapiComponent,
  StrapiComponentBase,
  StrapiOptional,
} from "@/shared/model/strapi"

export type ListTypes = "standOut" | "serviceProcesses" | "faq"

export interface ListSectionComponent
  extends StrapiComponentBase<"sections.list-section"> {
  title: StrapiOptional<string>
  type: ListTypes
  items: StrapiComponent<RowTextItemComponent[]>
}
