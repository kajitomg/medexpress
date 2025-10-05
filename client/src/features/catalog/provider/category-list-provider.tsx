"use client"

import {
  CategoryListState,
  CategoryListStore,
  createCategoryListStore,
} from "@/features/catalog/store"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"

export type CategoryListStoreApi = ReturnType<typeof createCategoryListStore>

export const CategoryListStoreContext = createContext<
  CategoryListStoreApi | undefined
>(undefined)

export interface CategoryListProviderProps {
  children: ReactNode
  initialState?: Partial<CategoryListState>
}

export const CategoryListProvider = ({
  children,
  initialState,
}: CategoryListProviderProps) => {
  const storeRef = useRef<CategoryListStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCategoryListStore(initialState)
  }

  return (
    <CategoryListStoreContext.Provider value={storeRef.current}>
      {children}
    </CategoryListStoreContext.Provider>
  )
}

export const useCategoryListStore = <T,>(
  selector: (store: CategoryListStore) => T
): T => {
  const context = useContext(CategoryListStoreContext)

  if (!context) {
    throw new Error(
      `useCategoryListStore must be used within CategoryListProvider`
    )
  }

  return useStore(context, selector)
}
