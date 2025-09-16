import { PageState } from "@/features/page/store/page-store"
import { ExtractByComponent, PageSections } from "@/shared/model/strapi"
import {
  ListSection,
  ListTypes,
} from "@/shared/model/strapi/sections/list-section"

export const selectSectionListItemByType =
  (type: ListTypes) => (state: PageState) =>
    state.sections?.find(
      (item): item is ListSection =>
        item.__component === "sections.list-section" && item.type === type
    )

export const selectSectionItemByName =
  <T extends PageSections["__component"]>(name: T) =>
  (state: PageState) =>
    state.sections?.find(
      (item): item is ExtractByComponent<T> => item.__component === name
    )
