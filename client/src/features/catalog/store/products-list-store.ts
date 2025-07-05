import { ProductBase } from "@/entities/product/model/product"
import { fetchAllProducts } from "@/entities/product/services/fetch-all-products"
import { DocumentId, DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

interface ProductsListState {
  products: (ProductBase & DocumentServices)[]
  isLoading: boolean
  error: string | null
}

interface ProductsListActions {
  fetchAllProducts: (
    category?: DocumentId | null,
    search?: string | null
  ) => Promise<void>
}

export type ProductsListStore = ProductsListState & ProductsListActions

const initState: ProductsListState = {
  products: [],
  isLoading: false,
  error: null,
}

export const useProductsListStore = create<ProductsListStore>((set) => ({
  ...initState,
  fetchAllProducts: async (
    category?: DocumentId | null,
    search?: string | null
  ) => {
    set({ isLoading: true, error: null })
    try {
      const fetchedProducts =
        (await fetchAllProducts(category ? [category] : [], search)) || []
      set({ products: fetchedProducts, isLoading: false })
    } catch (error) {
      if (error instanceof Error)
        set({ error: error?.message, isLoading: false })
    }
  },
}))
