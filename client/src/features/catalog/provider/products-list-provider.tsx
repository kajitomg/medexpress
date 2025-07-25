"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import { createProductsListStore, ProductsListStore } from "../store"

export type ProductsListStoreApi = ReturnType<typeof createProductsListStore>

export const ProductsListStoreContext = createContext<
  ProductsListStoreApi | undefined
>(undefined)

export interface ProductsListProviderProps {
  children: ReactNode
}

export const CatalogOptionsProvider = ({
  children,
}: ProductsListProviderProps) => {
  const storeRef = useRef<ProductsListStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createProductsListStore()
  }

  return (
    <ProductsListStoreContext.Provider value={storeRef.current}>
      {children}
    </ProductsListStoreContext.Provider>
  )
}

export const useProductsListStore = <T,>(
  selector: (store: ProductsListStore) => T
): T => {
  const context = useContext(ProductsListStoreContext)

  if (!context) {
    throw new Error(
      `useProductsListStore must be used within ProductsListProvider`
    )
  }

  return useStore(context, selector)
}
