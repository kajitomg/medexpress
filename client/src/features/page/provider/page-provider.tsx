"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import { createPageStore, PageState, PageStore } from "../store"

export type PageStoreApi = ReturnType<typeof createPageStore>

export const PageStoreContext = createContext<PageStoreApi | undefined>(
  undefined
)

export interface PageProviderProps {
  children: ReactNode
  initialState?: Partial<PageState>
}

export const PageProvider = ({ children, initialState }: PageProviderProps) => {
  const storeRef = useRef<PageStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createPageStore(initialState)
  }

  return (
    <PageStoreContext.Provider value={storeRef.current}>
      {children}
    </PageStoreContext.Provider>
  )
}

export const usePageStore = <T,>(selector: (store: PageStore) => T): T => {
  const context = useContext(PageStoreContext)

  if (!context) {
    throw new Error(`usePageStore must be used within PageProvider`)
  }

  return useStore(context, selector)
}
