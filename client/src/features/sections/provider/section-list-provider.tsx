"use client"

import { StrapiComponentBase } from "@/shared/model/strapi"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  createSectionListStore as createSectionListStoreContext,
  SectionListState,
  SectionListStore,
} from "../store"

export type SectionListStoreApi = ReturnType<
  typeof createSectionListStoreContext
>

export const SectionListStoreContext = createContext<
  SectionListStoreApi | undefined
>(undefined)

export interface SectionListProviderProps<
  T extends StrapiComponentBase<string>[],
> {
  children: ReactNode
  initialState?: Partial<SectionListState<T>>
}

export const SectionListProvider = <T extends StrapiComponentBase<string>[]>({
  children,
  initialState,
}: SectionListProviderProps<T>) => {
  const storeRef = useRef<SectionListStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createSectionListStoreContext<T>(initialState)
  }

  return (
    <SectionListStoreContext.Provider value={storeRef.current}>
      {children}
    </SectionListStoreContext.Provider>
  )
}

export function createSectionListStore<
  S extends StrapiComponentBase<string>[],
>() {
  return <T,>(selector: (store: SectionListStore<S>) => T): T => {
    const context = useContext(SectionListStoreContext)

    if (!context) {
      throw new Error(
        `useSectionListStore must be used within SectionListProvider`
      )
    }

    return useStore(context, selector as (state: unknown) => T)
  }
}
