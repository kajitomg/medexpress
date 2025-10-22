"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  CatalogProductOptionsState,
  CatalogProductOptionsStore,
  createCatalogProductOptionsStore,
} from "../store"

export type CatalogProductOptionsStoreApi = ReturnType<
  typeof createCatalogProductOptionsStore
>

export const CatalogProductOptionsStoreContext = createContext<
  CatalogProductOptionsStoreApi | undefined
>(undefined)

export interface CatalogProductOptionsProviderProps {
  children: ReactNode
  initialState?: Partial<CatalogProductOptionsState>
  skipHydration?: boolean
}

export const CatalogProductOptionsProvider = ({
  children,
  initialState,
  skipHydration,
}: CatalogProductOptionsProviderProps) => {
  const storeRef = useRef<CatalogProductOptionsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCatalogProductOptionsStore(
      initialState,
      skipHydration
    )
  }

  return (
    <CatalogProductOptionsStoreContext.Provider value={storeRef.current}>
      {children}
    </CatalogProductOptionsStoreContext.Provider>
  )
}

export const useCatalogProductOptionsStore = <T,>(
  selector: (store: CatalogProductOptionsStore) => T
): T => {
  const context = useContext(CatalogProductOptionsStoreContext)

  if (!context) {
    throw new Error(
      `useCatalogProductOptionsStore must be used within CatalogProductOptionsProvider`
    )
  }

  return useStore(context, selector)
}
