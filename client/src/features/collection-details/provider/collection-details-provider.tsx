"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  CollectionDetailsState,
  CollectionDetailsStore,
  createCollectionDetailsStore,
} from "../store"

export type CollectionDetailsStoreApi = ReturnType<
  typeof createCollectionDetailsStore
>

export const CollectionDetailsStoreContext = createContext<
  CollectionDetailsStoreApi | undefined
>(undefined)

export interface CollectionDetailsProviderProps {
  children: ReactNode
  initialState?: Partial<CollectionDetailsState>
}

export const CollectionDetailsProvider = ({
  children,
  initialState,
}: CollectionDetailsProviderProps) => {
  const storeRef = useRef<CollectionDetailsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCollectionDetailsStore(initialState)
  }

  return (
    <CollectionDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </CollectionDetailsStoreContext.Provider>
  )
}

export const useCollectionDetailsStore = <T,>(
  selector: (store: CollectionDetailsStore) => T
): T => {
  const context = useContext(CollectionDetailsStoreContext)

  if (!context) {
    throw new Error(
      `useCollectionDetailsStore must be used within CollectionDetailsProvider`
    )
  }

  return useStore(context, selector)
}
