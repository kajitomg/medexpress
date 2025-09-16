import { RowTextItem } from "@/shared/model/strapi/blocks/row-text-item"

export type ListTypes = "standOut" | "serviceProcesses" | "faq"

export type ListSection = {
  __component: "sections.list-section"
  title?: string
  type: ListTypes
  items: RowTextItem[]
}
