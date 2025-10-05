"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  createNomenclatureSectionDetailsStore,
  NomenclatureSectionDetailsState,
  NomenclatureSectionDetailsStore,
} from "../store"

export type NomenclatureSectionDetailsStoreApi = ReturnType<
  typeof createNomenclatureSectionDetailsStore
>

export const NomenclatureSectionDetailsStoreContext = createContext<
  NomenclatureSectionDetailsStoreApi | undefined
>(undefined)

export interface NomenclatureSectionDetailsProviderProps {
  children: ReactNode
  initialState?: Partial<NomenclatureSectionDetailsState>
}

export const NomenclatureSectionDetailsProvider = ({
  children,
  initialState,
}: NomenclatureSectionDetailsProviderProps) => {
  const storeRef = useRef<NomenclatureSectionDetailsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createNomenclatureSectionDetailsStore(initialState)
  }

  return (
    <NomenclatureSectionDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </NomenclatureSectionDetailsStoreContext.Provider>
  )
}

export const useNomenclatureSectionDetailsStore = <T,>(
  selector: (store: NomenclatureSectionDetailsStore) => T
): T => {
  const context = useContext(NomenclatureSectionDetailsStoreContext)

  if (!context) {
    throw new Error(
      `useNomenclatureSectionDetailsStore must be used within NomenclatureSectionDetailsProvider`
    )
  }

  return useStore(context, selector)
}
