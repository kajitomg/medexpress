import { DocumentId, Media } from "@/shared/model"

export type Social = {
  __component: "shared.social"
  id: DocumentId
  title: string
  icon?: Media
  body: {
    id: DocumentId
    title?: string
    url: string
    icon: Media
  }[]
}
