import { TextComponent } from "@/entities/_components/shared/text"
import { Specification } from "@/entities/specification/model"
import { StrapiComponent, StrapiComponentBase, StrapiRelation } from "@/shared/model/strapi"

export interface ProductSpecificationComponent
  extends StrapiComponentBase<"shared.product-specification"> {
  label: string
  type: StrapiRelation<Specification>
  bodyText?: string
  bodyBoolean?: boolean
  bodyNumber?: number
  bodyList?: StrapiComponent<TextComponent[]>
}
