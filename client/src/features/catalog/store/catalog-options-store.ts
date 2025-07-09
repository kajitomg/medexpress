import { searchParamsStorage } from "@/shared/lib"
import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface CatalogOptionsState {
  searchQuery?: string | null
  error: Error | null
}

interface CatalogOptionsActions {
  changeSearchQuery: (searchQuery?: string | null) => void
}

export type CatalogOptionsStore = CatalogOptionsState & CatalogOptionsActions

const initState: CatalogOptionsState = {
  searchQuery: null,
  error: null,
}

export const useCatalogOptionsStore = create<CatalogOptionsStore>()(
  persist(
    (set) => ({
      ...initState,
      changeSearchQuery: (searchQuery?: string | null) => {
        if (!searchQuery) searchQuery = undefined

        set({ error: null, searchQuery: searchQuery })
      },
    }),
    {
      name: "options",
      storage: createJSONStorage<Pick<CatalogOptionsState, "searchQuery">>(
        () => searchParamsStorage
      ),
      partialize: (state) => ({
        searchQuery: state.searchQuery,
      }),
      version: undefined,
    }
  )
)
