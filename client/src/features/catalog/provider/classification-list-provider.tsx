"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  ClassificationListState,
  ClassificationListStore,
  createClassificationListStore,
} from "../store"

export type ClassificationListStoreApi = ReturnType<
  typeof createClassificationListStore
>

export const ClassificationListStoreContext = createContext<
  ClassificationListStoreApi | undefined
>(undefined)

export interface ClassificationListProviderProps {
  children: ReactNode
  initialState?: Partial<ClassificationListState>
}

export const ClassificationListProvider = ({
  children,
  initialState,
}: ClassificationListProviderProps) => {
  const storeRef = useRef<ClassificationListStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createClassificationListStore(initialState)
  }

  return (
    <ClassificationListStoreContext.Provider value={storeRef.current}>
      {children}
    </ClassificationListStoreContext.Provider>
  )
}

export const useClassificationListStore = <T,>(
  selector: (store: ClassificationListStore) => T
): T => {
  const context = useContext(ClassificationListStoreContext)

  if (!context) {
    throw new Error(
      `useClassificationListStore must be used within ClassificationListProvider`
    )
  }

  return useStore(context, selector)
}
