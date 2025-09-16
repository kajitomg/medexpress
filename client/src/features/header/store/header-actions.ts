import { PageState } from "@/features/page/store/page-store"
import { ExtractByComponent, PageSections } from "@/shared/model/strapi"

export const selectSectionItemByName =
  <T extends PageSections["__component"]>(name: T) =>
  (state: PageState) =>
    state.sections?.find(
      (item): item is ExtractByComponent<T> => item.__component === name
    )
