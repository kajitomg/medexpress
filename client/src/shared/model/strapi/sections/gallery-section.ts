import { Media } from "@/shared/model"

export type GallerySection = {
  __component: "sections.gallery-section"
  title: string
  items?: Media[]
}
