import { DocumentId, Media } from "@/shared/model"

export type Email = {
  __component: "shared.email"
  title?: string
  icon?: Media
  body: { id: DocumentId; value: string }[]
}
