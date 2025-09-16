import { MarkdownItem } from "@/shared/model/strapi/blocks/markdown-item"

export type AboutInfo = {
  __component: "elements.about-info"
  items: MarkdownItem[]
}
