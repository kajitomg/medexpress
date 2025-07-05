import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { createJSONStorage, persist, StateStorage } from "zustand/middleware"

const getUrlSearch = () => {
  return window.location.search.slice(1)
}

const persistentStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(getUrlSearch())
    const storedValue = searchParams.get(key)
    return JSON.parse(storedValue as string)
  },
  setItem: (key, newValue): void => {
    const storedValue = new URLSearchParams(JSON.parse(newValue).state)
    if (!storedValue.size) window.history.replaceState(null, "", null)
    else {
      const searchParams = new URLSearchParams(getUrlSearch())
      searchParams.set(key, JSON.stringify(newValue))
      window.history.replaceState(null, "", `?${searchParams.toString()}`)
    }
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(getUrlSearch())
    searchParams.delete(key)
    window.location.search = searchParams.toString()
  },
}

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
        () => persistentStorage
      ),
      partialize: (state) => ({
        searchQuery: state.searchQuery,
      }),
      version: undefined,
    }
  )
)
