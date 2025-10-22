import {
  createPaginationSlice,
  defaultPaginationInitState,
  PaginationActionsWithNamespace,
  PaginationState,
  PaginationStateWithNamespace,
} from "@/features/pagination/slices"
import {
  createSearchSlice,
  defaultSearchInitState,
  SearchActionsWithNamespace,
  SearchState,
  SearchStateWithNamespace,
} from "@/features/search/slices"
import { searchParamsStorage } from "@/shared/lib"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export type CatalogCategoryOptionsState = PaginationStateWithNamespace &
  SearchStateWithNamespace & {
    _hasHydrated?: boolean
  }

export type CatalogCategoryOptionsActions = PaginationActionsWithNamespace &
  SearchActionsWithNamespace

export type CatalogCategoryOptionsStore = CatalogCategoryOptionsState &
  CatalogCategoryOptionsActions

export const defaultCatalogCategoryOptionsInitState: CatalogCategoryOptionsState =
  {
    pagination: defaultPaginationInitState,
    search: defaultSearchInitState,
  }

type InitState = {
  _hasHydrated?: boolean
  pagination?: Partial<PaginationState>
  search?: Partial<SearchState>
}

export const createCatalogCategoryOptionsStore = (
  initState: InitState = defaultCatalogCategoryOptionsInitState,
  skipHydration: boolean = false
) =>
  create<CatalogCategoryOptionsStore>()(
    immer(
      persist(
        (set, ...args) => {
          const init = {
            ...defaultCatalogCategoryOptionsInitState,
            ...initState,
          }
          return {
            ...init,
            ...createPaginationSlice<CatalogCategoryOptionsStore>(
              init.pagination
            )(set, ...args),
            search: {
              ...createSearchSlice<CatalogCategoryOptionsStore>(init.search)(
                set,
                ...args
              ).search,
              setQuery: (query) => {
                set((state) => {
                  state.pagination.page = 1
                  state.search.query = query
                })
              },
            },
          }
        },
        {
          name: "options",
          storage: createJSONStorage<
            Pick<PaginationState, "page"> & Pick<SearchState, "query">
          >(() => searchParamsStorage),
          partialize: (state) => ({
            query: state.search.query,
            page: state.pagination.page,
          }),
          version: undefined,
          skipHydration,
        }
      )
    )
  )
