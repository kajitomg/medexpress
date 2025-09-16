import { DocumentId, Media } from "@/shared/model"

export type RowTextItem = {
  __component: "blocks.row-text-item"
  id: DocumentId
  title?: string
  content: string
  icon?: Media
}
