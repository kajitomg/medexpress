"use client"

import { StrapiBase } from "@/shared/model/strapi"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore as useZustandStore } from "zustand"
import { BaseItemState, BaseItemStore, createBaseItemStore } from "../store"

export const createStoreBaseItemProvider = <T extends StrapiBase>(
  name: string
) => {
  type StoreApi = ReturnType<typeof createBaseItemStore<T>>

  const StoreContext = createContext<StoreApi | undefined>(undefined)

  interface ProviderProps {
    children: ReactNode
    initialState?: Partial<BaseItemState<T>>
  }

  const Provider = ({ children, initialState }: ProviderProps) => {
    const storeRef = useRef<StoreApi | null>(null)
    if (storeRef.current === null) {
      storeRef.current = createBaseItemStore<T>(initialState)
    }

    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    )
  }

  const useStore = <S,>(selector: (store: BaseItemStore<T>) => S): S => {
    const context = useContext(StoreContext)

    if (!context) {
      throw new Error(`use${name}Store must be used within ${name}Provider`)
    }

    return useZustandStore(context, selector)
  }

  return { Provider, useStore }
}
