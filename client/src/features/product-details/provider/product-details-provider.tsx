"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  createProductDetailsStore,
  ProductDetailsState,
  ProductDetailsStore,
} from "../store"

export type ProductDetailsStoreApi = ReturnType<
  typeof createProductDetailsStore
>

export const ProductDetailsStoreContext = createContext<
  ProductDetailsStoreApi | undefined
>(undefined)

export interface ProductDetailsProviderProps {
  children: ReactNode
  initialState?: Partial<ProductDetailsState>
}

export const ProductDetailsProvider = ({
  children,
  initialState,
}: ProductDetailsProviderProps) => {
  const storeRef = useRef<ProductDetailsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createProductDetailsStore(initialState)
  }

  return (
    <ProductDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </ProductDetailsStoreContext.Provider>
  )
}

export const useProductDetailsStore = <T,>(
  selector: (store: ProductDetailsStore) => T
): T => {
  const context = useContext(ProductDetailsStoreContext)

  if (!context) {
    throw new Error(
      `useProductDetailsStore must be used within ProductDetailsProvider`
    )
  }

  return useStore(context, selector)
}
