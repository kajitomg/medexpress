"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import { createGlobalStore, GlobalState, GlobalStore } from "../store"

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
  undefined
)

export interface GlobalProviderProps {
  children: ReactNode
  initialState?: Partial<GlobalState>
}

export const GlobalProvider = ({
  children,
  initialState,
}: GlobalProviderProps) => {
  const storeRef = useRef<GlobalStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createGlobalStore(initialState)
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  )
}

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const context = useContext(GlobalStoreContext)

  if (!context) {
    throw new Error(`useGlobalStore must be used within GlobalProvider`)
  }

  return useStore(context, selector)
}
