import { ProductBase } from "@/entities/product/model/product"
import { Meta } from "@/shared/model/api"
import { DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

export interface ProductsListState {
  products?: (ProductBase & DocumentServices)[]
  isLoading: boolean
  meta?: Meta
  error?: string
}

interface ProductsListActions {
  setProducts: (products: (ProductBase & DocumentServices)[]) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type ProductsListStore = ProductsListState & ProductsListActions

const defaultInitState: ProductsListState = {
  products: undefined,
  isLoading: false,
  meta: undefined,
  error: undefined,
}

export const createProductsListStore = (
  initState: Partial<ProductsListState> = defaultInitState
) =>
  create<ProductsListStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setProducts: (products) => set({ products }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
