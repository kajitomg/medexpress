"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import { createFooterStore, FooterState, FooterStore } from "../store"

export type FooterStoreApi = ReturnType<typeof createFooterStore>

export const FooterStoreContext = createContext<FooterStoreApi | undefined>(
  undefined
)

export interface FooterProviderProps {
  children: ReactNode
  initialState?: Partial<FooterState>
}

export const FooterProvider = ({
  children,
  initialState,
}: FooterProviderProps) => {
  const storeRef = useRef<FooterStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createFooterStore(initialState)
  }

  return (
    <FooterStoreContext.Provider value={storeRef.current}>
      {children}
    </FooterStoreContext.Provider>
  )
}

export const useFooterStore = <T,>(selector: (store: FooterStore) => T): T => {
  const context = useContext(FooterStoreContext)

  if (!context) {
    throw new Error(`useFooterStore must be used within FooterProvider`)
  }

  return useStore(context, selector)
}
