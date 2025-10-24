import { StrapiComponentBase, StrapiOptional } from "@/shared/model/strapi"

type PluralizationLanguages = "ru-RU" | "OTHER"

export interface PluralizationComponent
  extends StrapiComponentBase<"shared.pluralization"> {
  localeCode: PluralizationLanguages
  cut: StrapiOptional<string>
  zero: StrapiOptional<string>
  one: StrapiOptional<string>
  two: StrapiOptional<string>
  few: StrapiOptional<string>
  many: StrapiOptional<string>
  other: StrapiOptional<string>
}
