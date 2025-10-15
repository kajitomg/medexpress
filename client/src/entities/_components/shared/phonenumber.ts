import { Phonenumber } from "@/entities/phonenumber/model"
import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface PhonenumberComponent
  extends StrapiComponentBase<"shared.phonenumber"> {
  title?: string
  icon?: StrapiExtended<StrapiMedia>
  body: StrapiRelation<Phonenumber>
}
