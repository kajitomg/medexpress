import { Social } from "@/entities/social/model"
import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface SocialComponent extends StrapiComponentBase<"shared.social"> {
  title: StrapiOptional<string>
  icon: StrapiOptional<StrapiMedia<ImageMedia>>
  body: StrapiOptional<StrapiRelation<Social[]>>
}
