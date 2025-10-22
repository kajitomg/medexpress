import { Email } from "@/entities/email/model"
import { StrapiMedia } from "@/shared/model"
import {
  ImageMedia,
  StrapiComponentBase,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface EmailComponent extends StrapiComponentBase<"shared.email"> {
  title: StrapiOptional<string>
  icon: StrapiOptional<StrapiMedia<ImageMedia>>
  body: StrapiOptional<StrapiRelation<Email[]>>
}
