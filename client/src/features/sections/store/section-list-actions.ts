import {
  ListSection,
  ListTypes,
} from "@/entities/_components/sections/list-section"
import { PageSections } from "@/entities/page/model/page"
import { SectionListState } from "@/features/sections/store/section-list-store"
import { ExtractByComponent } from "@/shared/model/strapi"

export const selectSectionListItemByType =
  <S extends PageSections[]>(type: ListTypes) =>
  (state: SectionListState<S>) =>
    state.sections?.find(
      (item): item is ListSection =>
        item.__component === "sections.list-section" && item.type === type
    )

export const selectSectionItemByName =
  <S extends { __component: string }, T extends S["__component"]>(name: T) =>
  (state: SectionListState<S[]>) =>
    state.sections?.find(
      (item): item is ExtractByComponent<S, T> => item.__component === name
    )
