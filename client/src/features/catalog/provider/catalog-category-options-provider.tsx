"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  CatalogCategoryOptionsState,
  CatalogCategoryOptionsStore,
  createCatalogCategoryOptionsStore,
} from "../store"

export type CatalogCategoryOptionsStoreApi = ReturnType<
  typeof createCatalogCategoryOptionsStore
>

export const CatalogCategoryOptionsStoreContext = createContext<
  CatalogCategoryOptionsStoreApi | undefined
>(undefined)

export interface CatalogCategoryOptionsProviderProps {
  children: ReactNode
  initialState?: Partial<CatalogCategoryOptionsState>
  skipHydration?: boolean
}

export const CatalogCategoryOptionsProvider = ({
  children,
  initialState,
  skipHydration,
}: CatalogCategoryOptionsProviderProps) => {
  const storeRef = useRef<CatalogCategoryOptionsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCatalogCategoryOptionsStore(
      initialState,
      skipHydration
    )
  }

  return (
    <CatalogCategoryOptionsStoreContext.Provider value={storeRef.current}>
      {children}
    </CatalogCategoryOptionsStoreContext.Provider>
  )
}

export const useCatalogCategoryOptionsStore = <T,>(
  selector: (store: CatalogCategoryOptionsStore) => T
): T => {
  const context = useContext(CatalogCategoryOptionsStoreContext)

  if (!context) {
    throw new Error(
      `useCatalogCategoryOptionsStore must be used within CatalogCategoryOptionsProvider`
    )
  }

  return useStore(context, selector)
}
