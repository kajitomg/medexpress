"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import { CatalogOptionsStore, createCatalogOptionsStore } from "../store"

export type CatalogOptionsStoreApi = ReturnType<
  typeof createCatalogOptionsStore
>

export const CatalogOptionsStoreContext = createContext<
  CatalogOptionsStoreApi | undefined
>(undefined)

export interface CatalogOptionsProviderProps {
  children: ReactNode
}

export const CatalogOptionsProvider = ({
  children,
}: CatalogOptionsProviderProps) => {
  const storeRef = useRef<CatalogOptionsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCatalogOptionsStore()
  }

  return (
    <CatalogOptionsStoreContext.Provider value={storeRef.current}>
      {children}
    </CatalogOptionsStoreContext.Provider>
  )
}

export const useCatalogOptionsStore = <T,>(
  selector: (store: CatalogOptionsStore) => T
): T => {
  const context = useContext(CatalogOptionsStoreContext)

  if (!context) {
    throw new Error(
      `useCatalogOptionsStore must be used within CatalogOptionsProvider`
    )
  }

  return useStore(context, selector)
}
