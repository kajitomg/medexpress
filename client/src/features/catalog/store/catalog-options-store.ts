import { searchParamsStorage } from "@/shared/lib"
import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export interface CatalogOptionsState {
  searchQuery?: string
  page: number
  maxPages: number
  error?: Error
  _hasHydrated?: boolean
}

interface CatalogOptionsActions {
  changeSearchQuery: (searchQuery?: string) => void
  setPage: (page: number) => void
}

export type CatalogOptionsStore = CatalogOptionsState & CatalogOptionsActions

export const defaultInitState: CatalogOptionsState = {
  searchQuery: undefined,
  page: 1,
  maxPages: 1,
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
          changeSearchQuery: (searchQuery?: string) => {
            set((state) => {
              state.page = 1
              state.searchQuery = searchQuery
            })
          },
          setPage: (page: number) => {
            set((state) => {
              state.page = page
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
          }),
          version: undefined,
          skipHydration,
        }
      )
    )
  )
