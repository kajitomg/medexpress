import { TextComponent } from "@/entities/_components/shared/text"
import { Specification } from "@/entities/specification/model"
import {
  StrapiComponent,
  StrapiComponentBase,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface ProductSpecificationComponent
  extends StrapiComponentBase<"shared.product-specification"> {
  label: StrapiOptional<string>
  type: StrapiOptional<StrapiRelation<Specification>>
  bodyText: StrapiOptional<string>
  bodyBoolean: StrapiOptional<boolean>
  bodyNumber: StrapiOptional<number>
  bodyList: StrapiOptional<StrapiComponent<TextComponent[]>>
}
