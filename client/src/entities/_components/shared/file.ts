import {
  DocumentMedia,
  StrapiComponentBase,
  StrapiMedia,
} from "@/shared/model/strapi"

export interface FileComponent extends StrapiComponentBase<"shared.file"> {
  name: string
  value: StrapiMedia<DocumentMedia>
}
