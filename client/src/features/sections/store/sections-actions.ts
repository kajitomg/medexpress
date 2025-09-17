import { PageSections } from "@/entities/page/model/page"
import { SectionsState } from "@/features/sections/store/sections-store"
import { ExtractByComponent } from "@/shared/model/strapi"
import {
  ListSection,
  ListTypes,
} from "@/shared/model/strapi/sections/list-section"

export const selectSectionListItemByType =
  <S extends PageSections[]>(type: ListTypes) =>
  (state: SectionsState<S>) =>
    state.sections?.find(
      (item): item is ListSection =>
        item.__component === "sections.list-section" && item.type === type
    )

export const selectSectionItemByName =
  <S extends { __component: string }, T extends S["__component"]>(name: T) =>
  (state: SectionsState<S[]>) =>
    state.sections?.find(
      (item): item is ExtractByComponent<S, T> => item.__component === name
    )
