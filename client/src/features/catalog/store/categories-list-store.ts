import {
  CategoryBase,
  CategoryOptions,
} from "@/entities/category/model/category"
import { fetchAllCategories } from "@/entities/category/services"
import { DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

interface CategoriesListState {
  categories: (CategoryBase & CategoryOptions & DocumentServices)[] | null
  isLoading: boolean
  error: string | null
}

interface CategoriesListActions {
  setCategories: (
    categories: (CategoryBase & CategoryOptions & DocumentServices)[]
  ) => void
  fetchCategories: () => Promise<void>
}

export type CategoriesListStore = CategoriesListState & CategoriesListActions

const initState: CategoriesListState = {
  categories: null,
  isLoading: false,
  error: null,
}

export const useCategoriesListStore = create<CategoriesListStore>((set) => ({
  ...initState,
  setCategories: (
    categories: (CategoryBase & CategoryOptions & DocumentServices)[]
  ) => {
    set({ isLoading: false, error: null, categories })
  },
  fetchCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      const fetchedCategories = await fetchAllCategories()
      set({ categories: fetchedCategories })
    } catch (error) {
      if (error instanceof Error) set({ error: error?.message })
    } finally {
      set({ isLoading: false })
    }
  },
}))
