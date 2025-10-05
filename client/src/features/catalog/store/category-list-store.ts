import { CategoryBase, CategoryListResponse } from "@/entities/category/model"
import { DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

export interface CategoryListState {
  list?: (CategoryBase & DocumentServices)[]
  isLoading: boolean
  error?: string
}

interface CategoryListActions {
  setList: (list: (CategoryBase & DocumentServices)[]) => void
  loadList: <
    F extends (
      ...args: Parameters<F>
    ) => Promise<CategoryListResponse<CategoryBase & DocumentServices>>,
  >(
    fn: F,
    ...args: Parameters<F>
  ) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type CategoryListStore = CategoryListState & CategoryListActions

const defaultInitState: CategoryListState = {
  list: undefined,
  isLoading: false,
  error: undefined,
}

export const createCategoryListStore = (
  initState: Partial<CategoryListState> = defaultInitState
) =>
  create<CategoryListStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setList: (list) => set({ list }),

    loadList: async (fn, ...args) => {
      try {
        set({ isLoading: true })
        const response = await fn(...args)
        set({ list: response.data })
      } catch {
        return set({ error: "Что-то пошло не так" })
      } finally {
        set({ isLoading: false })
      }
    },

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
