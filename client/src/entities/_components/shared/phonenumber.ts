import { Phonenumber } from "@/entities/phonenumber/model"
import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface PhonenumberComponent
  extends StrapiComponentBase<"shared.phonenumber"> {
  title: StrapiOptional<string>
  icon: StrapiOptional<StrapiMedia<ImageMedia>>
  body: StrapiOptional<StrapiRelation<Phonenumber[]>>
}
