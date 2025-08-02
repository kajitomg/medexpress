"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  CategoriesListState,
  CategoriesListStore,
  createCategoriesListStore,
} from "../store"

export type CategoriesListStoreApi = ReturnType<
  typeof createCategoriesListStore
>

export const CategoriesListStoreContext = createContext<
  CategoriesListStoreApi | undefined
>(undefined)

export interface CategoriesListProviderProps {
  children: ReactNode
  initialState?: Partial<CategoriesListState>
}

export const CategoriesListProvider = ({
  children,
  initialState,
}: CategoriesListProviderProps) => {
  const storeRef = useRef<CategoriesListStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCategoriesListStore(initialState)
  }

  return (
    <CategoriesListStoreContext.Provider value={storeRef.current}>
      {children}
    </CategoriesListStoreContext.Provider>
  )
}

export const useCategoriesListStore = <T,>(
  selector: (store: CategoriesListStore) => T
): T => {
  const context = useContext(CategoriesListStoreContext)

  if (!context) {
    throw new Error(
      `useCategoriesListStore must be used within CategoriesListProvider`
    )
  }

  return useStore(context, selector)
}
