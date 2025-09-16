import { DocumentId, Media } from "@/shared/model"

export type Address = {
  __component: "shared.address"
  title?: string
  icon?: Media
  body: { id: DocumentId; value: string }[]
}
