import { CategoryBase } from "@/entities/category/model/category"
import { DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

export interface CategoriesListState {
  categories?: (CategoryBase & DocumentServices)[]
  isLoading: boolean
  error?: string
}

interface CategoriesListActions {
  setCategories: (categories: (CategoryBase & DocumentServices)[]) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type CategoriesListStore = CategoriesListState & CategoriesListActions

const defaultInitState: CategoriesListState = {
  categories: undefined,
  isLoading: false,
  error: undefined,
}

export const createCategoriesListStore = (
  initState: Partial<CategoriesListState> = defaultInitState
) =>
  create<CategoriesListStore>((set) => ({
    ...{ ...defaultInitState, ...initState },

    setCategories: (categories) => set({ categories }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
