import { StrapiComponentBase } from "@/shared/model/strapi"
import { BlocksContent } from "@strapi/blocks-react-renderer"

export interface MarkdownItemComponent
  extends StrapiComponentBase<"blocks.markdown-item"> {
  title: string
  content: BlocksContent
}
