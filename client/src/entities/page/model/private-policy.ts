import { DocumentId } from "@/shared/model"

export type PrivatePolicy = {
  id: DocumentId
  title?: string
  code?: string
  description?: string
  childrens?: string
}
