"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  createSectionsStore as createSectionsStoreContext,
  SectionsState,
  SectionsStore,
} from "../store"

export type SectionsStoreApi = ReturnType<typeof createSectionsStoreContext>

export const SectionsStoreContext = createContext<SectionsStoreApi | undefined>(
  undefined
)

export interface SectionsProviderProps<
  T extends {
    __component: string
  }[],
> {
  children: ReactNode
  initialState?: Partial<SectionsState<T>>
}

export const SectionsProvider = <
  T extends {
    __component: string
  }[],
>({
  children,
  initialState,
}: SectionsProviderProps<T>) => {
  const storeRef = useRef<SectionsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createSectionsStoreContext<T>(initialState)
  }

  return (
    <SectionsStoreContext.Provider value={storeRef.current}>
      {children}
    </SectionsStoreContext.Provider>
  )
}

export function createSectionsStore<S extends { __component: string }[]>() {
  return <T,>(selector: (store: SectionsStore<S>) => T): T => {
    const context = useContext(SectionsStoreContext)

    if (!context) {
      throw new Error(`useSectionsStore must be used within SectionsProvider`)
    }

    return useStore(context, selector as (state: unknown) => T)
  }
}
