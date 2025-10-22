import { WithNamespace } from "@/shared/model/helpers"
import { StateCreator } from "zustand"
import { immer } from "zustand/middleware/immer"

export interface SearchState {
  query?: string
}

export interface SearchActions {
  setQuery: (query?: string) => void
}

export type SearchSlice = SearchState & SearchActions

export const defaultSearchInitState: SearchState = {
  query: undefined,
}

export type SearchStateWithNamespace = WithNamespace<SearchState, "search">

export type SearchActionsWithNamespace = WithNamespace<SearchActions, "search">

export type SearchSliceWithNamespace = WithNamespace<SearchSlice, "search">

export const createSearchSlice = <
  T extends SearchSliceWithNamespace = SearchSliceWithNamespace,
>(
  initState: Partial<SearchState> = defaultSearchInitState
): StateCreator<T, [], [["zustand/immer", never]], SearchSliceWithNamespace> =>
  immer((set) => ({
    search: {
      ...defaultSearchInitState,
      ...initState,
      setQuery: (query) => {
        set((state) => {
          state.search.query = query
        })
      },
    },
  }))
