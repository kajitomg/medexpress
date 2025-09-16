import { DocumentId, Media } from "@/shared/model"

export type Phonenumber = {
  __component: "shared.phonenumber"
  title?: string
  icon?: Media
  body: { id: DocumentId; value: string }[]
}
