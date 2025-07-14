import { searchParamsStorage } from "@/shared/lib"
import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface CatalogOptionsState {
  searchQuery?: string | null
  page: number
  error: Error | null
}

interface CatalogOptionsActions {
  changeSearchQuery: (searchQuery?: string | null) => void
  setPage: (page: number) => void
}

export type CatalogOptionsStore = CatalogOptionsState & CatalogOptionsActions

const initState: CatalogOptionsState = {
  searchQuery: undefined,
  page: 1,
  error: null,
}

export const useCatalogOptionsStore = create<CatalogOptionsStore>()(
  immer(
    persist(
      (set) => ({
        ...initState,
        changeSearchQuery: (searchQuery?: string | null) => {
          set((state) => {
            if (!searchQuery) searchQuery = undefined

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
      }
    )
  )
)
