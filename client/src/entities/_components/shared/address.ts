import { Address } from "@/entities/address/model"
import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface AddressComponent
  extends StrapiComponentBase<"shared.address"> {
  title?: string
  icon?: StrapiExtended<StrapiMedia>
  body: StrapiRelation<Address[]>
}
