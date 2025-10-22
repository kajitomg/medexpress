import { Address } from "@/entities/address/model"
import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface AddressComponent
  extends StrapiComponentBase<"shared.address"> {
  title: StrapiOptional<string>
  icon: StrapiOptional<StrapiMedia<ImageMedia>>
  body: StrapiOptional<StrapiRelation<Address[]>>
}
