"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  ClassificationTypeListState,
  ClassificationTypeListStore,
  createClassificationTypeListStore,
} from "../store"

export type ClassificationTypeListStoreApi = ReturnType<
  typeof createClassificationTypeListStore
>

export const ClassificationTypeListStoreContext = createContext<
  ClassificationTypeListStoreApi | undefined
>(undefined)

export interface ClassificationTypeListProviderProps {
  children: ReactNode
  initialState?: Partial<ClassificationTypeListState>
}

export const ClassificationTypeListProvider = ({
  children,
  initialState,
}: ClassificationTypeListProviderProps) => {
  const storeRef = useRef<ClassificationTypeListStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createClassificationTypeListStore(initialState)
  }

  return (
    <ClassificationTypeListStoreContext.Provider value={storeRef.current}>
      {children}
    </ClassificationTypeListStoreContext.Provider>
  )
}

export const useClassificationTypeListStore = <T,>(
  selector: (store: ClassificationTypeListStore) => T
): T => {
  const context = useContext(ClassificationTypeListStoreContext)

  if (!context) {
    throw new Error(
      `useClassificationTypeListStore must be used within ClassificationTypeListProvider`
    )
  }

  return useStore(context, selector)
}
