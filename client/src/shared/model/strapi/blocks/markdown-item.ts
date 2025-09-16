import { BlocksContent } from "@strapi/blocks-react-renderer"

export type MarkdownItem = {
  __component: "blocks.markdown-item"
  title: string
  content: BlocksContent
}
