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

export type CatalogProductOptionsState = PaginationStateWithNamespace &
  SearchStateWithNamespace & {
    _hasHydrated?: boolean
  }

export type CatalogProductOptionsActions = PaginationActionsWithNamespace &
  SearchActionsWithNamespace

export type CatalogProductOptionsStore = CatalogProductOptionsState &
  CatalogProductOptionsActions

export const defaultCatalogProductOptionsInitState: CatalogProductOptionsState =
  {
    pagination: defaultPaginationInitState,
    search: defaultSearchInitState,
  }

type InitState = {
  _hasHydrated?: boolean
  pagination?: Partial<PaginationState>
  search?: Partial<SearchState>
}

export const createCatalogProductOptionsStore = (
  initState: InitState = defaultCatalogProductOptionsInitState,
  skipHydration: boolean = false
) =>
  create<CatalogProductOptionsStore>()(
    immer(
      persist(
        (set, get, ...args) => {
          const init = {
            ...defaultCatalogProductOptionsInitState,
            ...initState,
          }
          return {
            ...init,
            ...createPaginationSlice<CatalogProductOptionsStore>(
              init.pagination
            )(set, get, ...args),
            search: {
              ...createSearchSlice<CatalogProductOptionsStore>(init.search)(
                set,
                get,
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
