import { StrapiBase, StrapiOptional } from "@/shared/model/strapi"

export interface Address extends StrapiBase {
  postalCode: string
  region: string
  district: StrapiOptional<string>
  city: string
  street: string
  house: string
  building: StrapiOptional<string>
  apartment: StrapiOptional<string>
  entrance: StrapiOptional<string>
  floor: StrapiOptional<string>
  fullAddress: StrapiOptional<string>
}
