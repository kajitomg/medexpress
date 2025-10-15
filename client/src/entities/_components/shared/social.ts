import { Social } from "@/entities/social/model"
import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface SocialComponent extends StrapiComponentBase<"shared.social"> {
  title: string
  icon?: StrapiExtended<StrapiMedia>
  body: StrapiRelation<Social[]>
}
