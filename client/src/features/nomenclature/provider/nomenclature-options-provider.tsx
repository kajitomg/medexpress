"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  createNomenclatureOptionsStore,
  NomenclatureOptionsState,
  NomenclatureOptionsStore,
} from "../store"

export type NomenclatureOptionsStoreApi = ReturnType<
  typeof createNomenclatureOptionsStore
>

export const NomenclatureOptionsStoreContext = createContext<
  NomenclatureOptionsStoreApi | undefined
>(undefined)

export interface NomenclatureOptionsProviderProps {
  children: ReactNode
  initialState?: Partial<NomenclatureOptionsState>
  skipHydration?: boolean
}

export const NomenclatureOptionsProvider = ({
  children,
  initialState,
  skipHydration,
}: NomenclatureOptionsProviderProps) => {
  const storeRef = useRef<NomenclatureOptionsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createNomenclatureOptionsStore(
      initialState,
      skipHydration
    )
  }

  return (
    <NomenclatureOptionsStoreContext.Provider value={storeRef.current}>
      {children}
    </NomenclatureOptionsStoreContext.Provider>
  )
}

export const useNomenclatureOptionsStore = <T,>(
  selector: (store: NomenclatureOptionsStore) => T
): T => {
  const context = useContext(NomenclatureOptionsStoreContext)

  if (!context) {
    throw new Error(
      `useNomenclatureOptionsStore must be used within NomenclatureOptionsProvider`
    )
  }

  return useStore(context, selector)
}
