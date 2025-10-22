import {
  createNomenclatureFilterSlice,
  defaultNomenclatureFilterInitState,
  NomenclatureFilterActionsWithNamespace,
  NomenclatureFilterState,
  NomenclatureFilterStateWithNamespace,
} from "@/features/nomenclature/slices"
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
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export type NomenclatureOptionsState = NomenclatureFilterStateWithNamespace &
  PaginationStateWithNamespace &
  SearchStateWithNamespace & {
    _hasHydrated?: boolean
  }

export type NomenclatureOptionsActions =
  NomenclatureFilterActionsWithNamespace &
    PaginationActionsWithNamespace &
    SearchActionsWithNamespace

export type NomenclatureOptionsStore = NomenclatureOptionsState &
  NomenclatureOptionsActions

export const defaultNomenclatureOptionsInitState: NomenclatureOptionsState = {
  pagination: defaultPaginationInitState,
  search: defaultSearchInitState,
  filter: defaultNomenclatureFilterInitState,
  _hasHydrated: false,
}

type InitState = {
  _hasHydrated?: boolean
  filter?: Partial<NomenclatureFilterState>
  pagination?: Partial<PaginationState>
  search?: Partial<SearchState>
}

type StoredState = Pick<NomenclatureFilterState, "nomenclatureSlug"> &
  Pick<PaginationState, "page"> &
  Pick<SearchState, "query">

export const createNomenclatureOptionsStore = (
  initState: InitState = defaultNomenclatureOptionsInitState,
  skipHydration: boolean = false
) =>
  create<NomenclatureOptionsStore>()(
    devtools(
      immer(
        persist(
          (set, ...args) => {
            const init = {
              ...defaultNomenclatureOptionsInitState,
              ...initState,
            }
            return {
              ...init,
              ...createPaginationSlice<NomenclatureOptionsStore>(
                init.pagination
              )(set, ...args),
              search: {
                ...createSearchSlice<NomenclatureOptionsStore>(init.search)(
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
              filter: {
                ...createNomenclatureFilterSlice<NomenclatureOptionsStore>(
                  init.filter
                )(set, ...args).filter,
                setNomenclatureSlug: (nomenclatureSlug) => {
                  set((state) => {
                    state.pagination.page = 1
                    state.filter.nomenclatureSlug = nomenclatureSlug
                    state.search.query = undefined
                    state.pagination.maxPages = 1
                  })
                },
              },
            }
          },
          {
            name: "options",
            storage: createJSONStorage<StoredState>(() => searchParamsStorage),
            partialize: (state) => ({
              query: state.search.query,
              page: state.pagination.page,
              nomenclatureSlug: state.filter.nomenclatureSlug,
            }),
            merge: (persistedState, currentState) => {
              const persisted = persistedState as StoredState

              return {
                ...currentState,
                search: {
                  ...currentState.search,
                  query: persisted.query ?? currentState.search.query,
                },
                pagination: {
                  ...currentState.pagination,
                  page: persisted.page ?? currentState.pagination.page,
                },
                filter: {
                  ...currentState.filter,
                  nomenclatureSlug:
                    persisted.nomenclatureSlug ??
                    currentState.filter.nomenclatureSlug,
                },
              }
            },
            onRehydrateStorage: () => (state) => {
              if (state) {
                state._hasHydrated = true
              }
            },
            version: undefined,
            skipHydration,
          }
        )
      ),
      { name: "nomenclatureOptions" }
    )
  )
