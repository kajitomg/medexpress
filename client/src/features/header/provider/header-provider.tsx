"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import { createHeaderStore, HeaderState, HeaderStore } from "../store"

export type HeaderStoreApi = ReturnType<typeof createHeaderStore>

export const HeaderStoreContext = createContext<HeaderStoreApi | undefined>(
  undefined
)

export interface HeaderProviderProps {
  children: ReactNode
  initialState?: Partial<HeaderState>
}

export const HeaderProvider = ({
  children,
  initialState,
}: HeaderProviderProps) => {
  const storeRef = useRef<HeaderStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createHeaderStore(initialState)
  }

  return (
    <HeaderStoreContext.Provider value={storeRef.current}>
      {children}
    </HeaderStoreContext.Provider>
  )
}

export const useHeaderStore = <T,>(selector: (store: HeaderStore) => T): T => {
  const context = useContext(HeaderStoreContext)

  if (!context) {
    throw new Error(`useHeaderStore must be used within HeaderProvider`)
  }

  return useStore(context, selector)
}
