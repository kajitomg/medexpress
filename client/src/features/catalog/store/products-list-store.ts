import {
  ProductBase,
  ProductListResponse,
} from "@/entities/product/model/product"
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
  loadProducts: <
    F extends (
      ...args: Parameters<F>
    ) => Promise<ProductListResponse<ProductBase & DocumentServices>>,
  >(
    fn: F,
    ...args: Parameters<F>
  ) => void
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

    loadProducts: async (fn, ...args) => {
      try {
        set({ isLoading: true })
        const response = await fn(...args)
        set({ products: response.data })
      } catch {
        return set({ error: "Что-то пошло не так" })
      } finally {
        set({ isLoading: false })
      }
    },

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
