"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  createPageLayoutStore,
  PageLayoutState,
  PageLayoutStore,
} from "../store"

export type PageLayoutStoreApi = ReturnType<typeof createPageLayoutStore>

export const PageLayoutStoreContext = createContext<
  PageLayoutStoreApi | undefined
>(undefined)

export interface PageLayoutProviderProps {
  children: ReactNode
  initialState?: Partial<PageLayoutState>
}

export const PageLayoutProvider = ({
  children,
  initialState,
}: PageLayoutProviderProps) => {
  const storeRef = useRef<PageLayoutStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createPageLayoutStore(initialState)
  }

  return (
    <PageLayoutStoreContext.Provider value={storeRef.current}>
      {children}
    </PageLayoutStoreContext.Provider>
  )
}

export const usePageLayoutStore = <T,>(
  selector: (store: PageLayoutStore) => T
): T => {
  const context = useContext(PageLayoutStoreContext)

  if (!context) {
    throw new Error(`usePageLayoutStore must be used within PageLayoutProvider`)
  }

  return useStore(context, selector)
}
