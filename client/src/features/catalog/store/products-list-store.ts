import { ProductBase } from "@/entities/product/model/product"
import { fetchAllProducts } from "@/entities/product/services/fetch-all-products"
import { Meta } from "@/shared/model/api"
import { DocumentId, DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

interface ProductsListState {
  products: (ProductBase & DocumentServices)[]
  isLoading: boolean
  meta: Meta | null
  error: string | null
}

interface ProductsListActions {
  fetchAllProducts: (
    page?: number,
    category?: DocumentId | null,
    search?: string | null
  ) => Promise<void>
  setProducts: (products: (ProductBase & DocumentServices)[]) => void
}

export type ProductsListStore = ProductsListState & ProductsListActions

const defaultInitState: ProductsListState = {
  products: [],
  isLoading: false,
  meta: null,
  error: null,
}

export const useProductsListStore = create<ProductsListStore>((set) => ({
  ...defaultInitState,
  fetchAllProducts: async (
    page: number = 1,
    category?: DocumentId | null,
    search?: string | null
  ) => {
    set({ isLoading: true, error: null })
    try {
      const fetchedData = await fetchAllProducts(
        page,
        category ? [category] : [],
        search
      )
      const products = fetchedData?.data || []
      const meta = fetchedData?.meta || null

      set(() => ({ products, meta, isLoading: false }))
    } catch (error) {
      if (error instanceof Error)
        set({ error: error?.message, isLoading: false })
    }
  },
  setProducts: (products: (ProductBase & DocumentServices)[]) => {
    set({ products: products, isLoading: false, error: null })
  },
}))

export const createProductsListStore = (
  initState: ProductsListState = defaultInitState
) =>
  create<ProductsListStore>((set) => ({
    ...initState,
    fetchAllProducts: async (
      page: number = 1,
      category?: DocumentId | null,
      search?: string | null
    ) => {
      set({ isLoading: true, error: null })
      try {
        const fetchedData = await fetchAllProducts(
          page,
          category ? [category] : [],
          search
        )
        const products = fetchedData?.data || []
        const meta = fetchedData?.meta || null

        set(() => ({ products, meta, isLoading: false }))
      } catch (error) {
        if (error instanceof Error)
          set({ error: error?.message, isLoading: false })
      }
    },
    setProducts: (products: (ProductBase & DocumentServices)[]) => {
      set({ products: products, isLoading: false, error: null })
    },
  }))
