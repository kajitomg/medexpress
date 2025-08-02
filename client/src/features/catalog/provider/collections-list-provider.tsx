"use client"

import {
  CollectionsListState,
  CollectionsListStore,
  createCollectionsListStore,
} from "@/features/catalog/store"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"

export type CollectionsListStoreApi = ReturnType<
  typeof createCollectionsListStore
>

export const CollectionsListStoreContext = createContext<
  CollectionsListStoreApi | undefined
>(undefined)

export interface CollectionsListProviderProps {
  children: ReactNode
  initialState?: Partial<CollectionsListState>
}

export const CollectionsListProvider = ({
  children,
  initialState,
}: CollectionsListProviderProps) => {
  const storeRef = useRef<CollectionsListStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCollectionsListStore(initialState)
  }

  return (
    <CollectionsListStoreContext.Provider value={storeRef.current}>
      {children}
    </CollectionsListStoreContext.Provider>
  )
}

export const useCollectionsListStore = <T,>(
  selector: (store: CollectionsListStore) => T
): T => {
  const context = useContext(CollectionsListStoreContext)

  if (!context) {
    throw new Error(
      `useCollectionsListStore must be used within CollectionsListProvider`
    )
  }

  return useStore(context, selector)
}
