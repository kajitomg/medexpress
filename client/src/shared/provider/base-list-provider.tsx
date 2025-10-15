"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore as useZustandStore } from "zustand"
import { BaseListState, BaseListStore, createBaseListStore } from "../store"

export const createStoreBaseListProvider = <T,>(name: string) => {
  type StoreApi = ReturnType<typeof createBaseListStore<T>>

  const StoreContext = createContext<StoreApi | undefined>(undefined)

  interface ProviderProps {
    children: ReactNode
    initialState?: Partial<BaseListState<T>>
  }

  const Provider = ({ children, initialState }: ProviderProps) => {
    const storeRef = useRef<StoreApi | null>(null)
    if (storeRef.current === null) {
      storeRef.current = createBaseListStore<T>(initialState)
    }

    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    )
  }

  const useStore = <S,>(selector: (store: BaseListStore<T>) => S): S => {
    const context = useContext(StoreContext)

    if (!context) {
      throw new Error(`use${name}Store must be used within ${name}Provider`)
    }

    return useZustandStore(context, selector)
  }

  return { Provider, useStore }
}
