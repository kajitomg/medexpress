import {
  ProductBase,
  ProductListResponse,
} from "@/entities/product/model/product"
import { DocumentServices } from "@/shared/model/document"
import { StrapiMetaResponse } from "@/shared/model/strapi"
import { create } from "zustand"

export interface ProductsListState {
  list?: (ProductBase & DocumentServices)[]
  isLoading: boolean
  meta?: StrapiMetaResponse
  error?: string
}

interface ProductsListActions {
  setList: (list: (ProductBase & DocumentServices)[]) => void
  loadList: <
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
  list: undefined,
  isLoading: false,
  meta: undefined,
  error: undefined,
}

export const createProductsListStore = (
  initState: Partial<ProductsListState> = defaultInitState
) =>
  create<ProductsListStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setList: (list) => set({ list }),

    loadList: async (fn, ...args) => {
      try {
        set({ isLoading: true })
        const response = await fn(...args)
        set({ list: response.data })
      } catch {
        return set({ error: "Что-то пошло не так" })
      } finally {
        set({ isLoading: false })
      }
    },

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
