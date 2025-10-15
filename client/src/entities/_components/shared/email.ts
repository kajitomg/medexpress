import { Email } from "@/entities/email/model"
import { StrapiMedia } from "@/shared/model"
import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface EmailComponent extends StrapiComponentBase<"shared.email"> {
  title?: string
  icon?: StrapiExtended<StrapiMedia>
  body: StrapiRelation<Email[]>
}
