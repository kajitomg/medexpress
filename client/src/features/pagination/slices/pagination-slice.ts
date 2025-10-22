import { WithNamespace } from "@/shared/model/helpers"
import { StateCreator } from "zustand"
import { immer } from "zustand/middleware/immer"

export interface PaginationState {
  page: number
  maxPages: number
}

export interface PaginationActions {
  setPage: (page: number) => void
  setMaxPages: (pages: number) => void
}

export type PaginationSlice = PaginationState & PaginationActions

export const defaultPaginationInitState: PaginationState = {
  page: 1,
  maxPages: 1,
}

export type PaginationStateWithNamespace = WithNamespace<
  PaginationState,
  "pagination"
>

export type PaginationActionsWithNamespace = WithNamespace<
  PaginationActions,
  "pagination"
>

export type PaginationSliceWithNamespace = WithNamespace<
  PaginationSlice,
  "pagination"
>

export const createPaginationSlice = <
  T extends PaginationSliceWithNamespace = PaginationSliceWithNamespace,
>(
  initState: Partial<PaginationState> = defaultPaginationInitState
): StateCreator<
  T,
  [],
  [["zustand/immer", never]],
  PaginationSliceWithNamespace
> =>
  immer((set) => ({
    pagination: {
      ...defaultPaginationInitState,
      ...initState,
      setPage: (page) => {
        set((state) => {
          state.pagination.page = page
        })
      },
      setMaxPages: (pages) => {
        set((state) => {
          state.pagination.maxPages = pages
        })
      },
    },
  }))
