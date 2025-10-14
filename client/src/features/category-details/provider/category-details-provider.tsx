"use client"

import { CategoryBase } from "@/entities/category/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseItemProvider } from "@/shared/provider/base-item-provider"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  CategoryDetailsState,
  CategoryDetailsStore,
  createCategoryDetailsStore,
} from "../store"

export type CategoryDetailsStoreApi = ReturnType<
  typeof createCategoryDetailsStore
>

export const CategoryDetailsStoreContext = createContext<
  CategoryDetailsStoreApi | undefined
>(undefined)

export interface CategoryDetailsProviderProps {
  children: ReactNode
  initialState?: Partial<CategoryDetailsState>
}

export const CategoryDetailsProvider = ({
  children,
  initialState,
}: CategoryDetailsProviderProps) => {
  const storeRef = useRef<CategoryDetailsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCategoryDetailsStore(initialState)
  }

  return (
    <CategoryDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </CategoryDetailsStoreContext.Provider>
  )
}

export const useCategoryDetailsStore = <T,>(
  selector: (store: CategoryDetailsStore) => T
): T => {
  const context = useContext(CategoryDetailsStoreContext)

  if (!context) {
    throw new Error(
      `useCategoryDetailsStore must be used within CategoryDetailsProvider`
    )
  }

  return useStore(context, selector)
}

const {
  Provider: CategoryDetailsProviderTest,
  useStore: useCategoryDetailsStoreTest,
} = createStoreBaseItemProvider<CategoryBase & DocumentServices>(
  "CategoryDetails"
)

export { CategoryDetailsProviderTest, useCategoryDetailsStoreTest }
