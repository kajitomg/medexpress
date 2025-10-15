import { MarkdownItemComponent } from "@/entities/_components/blocks/markdown-item"
import { StrapiComponent, StrapiComponentBase } from "@/shared/model/strapi"

export interface AboutInfoComponent
  extends StrapiComponentBase<"elements.about-info"> {
  items: StrapiComponent<MarkdownItemComponent[]>
}
