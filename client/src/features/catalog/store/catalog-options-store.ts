import { searchParamsStorage } from "@/shared/lib"
import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export interface CatalogOptionsState {
  page: number
  maxPages: number
  nomenclatureSlug?: string
  searchQuery?: string
  error?: Error
  _hasHydrated?: boolean
}

interface CatalogOptionsActions {
  setSearchQuery: (searchQuery?: string) => void
  setPage: (page: number) => void
  setNomenclatureSlug: (nomenclatureSlug?: string) => void
  setMaxPages: (pages: number) => void
}

export type CatalogOptionsStore = CatalogOptionsState & CatalogOptionsActions

export const defaultInitState: CatalogOptionsState = {
  page: 1,
  maxPages: 1,
  nomenclatureSlug: undefined,
  searchQuery: undefined,
  error: undefined,
}

export const createCatalogOptionsStore = (
  initState: Partial<CatalogOptionsState> = defaultInitState,
  skipHydration: boolean = false
) =>
  create<CatalogOptionsStore>()(
    immer(
      persist(
        (set) => ({
          ...{ ...defaultInitState, ...initState },
          setSearchQuery: (searchQuery) => {
            set((state) => {
              state.page = 1
              state.searchQuery = searchQuery
            })
          },
          setPage: (page) => {
            set((state) => {
              state.page = page
            })
          },
          setMaxPages: (pages) => {
            set((state) => {
              state.maxPages = pages
            })
          },
          setNomenclatureSlug: (nomenclatureSlug) => {
            set((state) => {
              state.page = 1
              state.nomenclatureSlug = nomenclatureSlug
              state.searchQuery = undefined
              state.maxPages = 1
            })
          },
        }),
        {
          name: "options",
          storage: createJSONStorage<Pick<CatalogOptionsState, "searchQuery">>(
            () => searchParamsStorage
          ),
          partialize: (state) => ({
            searchQuery: state.searchQuery,
            page: state.page,
            nomenclatureSlug: state.nomenclatureSlug,
          }),
          version: undefined,
          skipHydration,
        }
      )
    )
  )
