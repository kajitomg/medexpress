import { CategoryBase } from "@/entities/category/model"
import { DocumentServices } from "@/shared/model"
import { create } from "zustand"

export interface CategoryDetailsState {
  category?: CategoryBase & DocumentServices
  isLoading: boolean
  error?: string
}

interface CategoryDetailsActions {
  setCategory: (category: CategoryBase & DocumentServices) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type CategoryDetailsStore = CategoryDetailsState & CategoryDetailsActions

const defaultInitState: CategoryDetailsState = {
  category: undefined,
  isLoading: false,
  error: undefined,
}

export const createCategoryDetailsStore = (
  initState: Partial<CategoryDetailsState> = defaultInitState
) =>
  create<CategoryDetailsStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setCategory: (category) => set({ category }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
