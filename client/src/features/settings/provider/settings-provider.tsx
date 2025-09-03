"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import { createSettingsStore, SettingsState, SettingsStore } from "../store"

export type SettingsStoreApi = ReturnType<typeof createSettingsStore>

export const SettingsStoreContext = createContext<SettingsStoreApi | undefined>(
  undefined
)

export interface SettingsProviderProps {
  children: ReactNode
  initialState?: Partial<SettingsState>
}

export const SettingsProvider = ({
  children,
  initialState,
}: SettingsProviderProps) => {
  const storeRef = useRef<SettingsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createSettingsStore(initialState)
  }

  return (
    <SettingsStoreContext.Provider value={storeRef.current}>
      {children}
    </SettingsStoreContext.Provider>
  )
}

export const useSettingsStore = <T,>(
  selector: (store: SettingsStore) => T
): T => {
  const context = useContext(SettingsStoreContext)

  if (!context) {
    throw new Error(`useSettingsStore must be used within SettingsProvider`)
  }

  return useStore(context, selector)
}
