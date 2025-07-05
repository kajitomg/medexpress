import { ProductBase } from "@/entities/product/model/product"
import { fetchOneProduct } from "@/entities/product/services/fetch-one-product"
import { create } from "zustand"

interface ProductDetailsState {
  product: ProductBase | null
  isLoading: boolean
  error: string | null
}

interface ProductDetailsActions {
  fetchOneProduct: (documentId: string) => Promise<void>
}

export type ProductDetailsStore = ProductDetailsState & ProductDetailsActions

const initState: ProductDetailsState = {
  product: null,
  isLoading: false,
  error: null,
}

export const useProductDetailsStore = create<ProductDetailsStore>((set) => ({
  ...initState,
  fetchOneProduct: async (documentId: string) => {
    set({ isLoading: true, error: null })
    try {
      const fetchedProduct = await fetchOneProduct(documentId)
      set({ product: fetchedProduct || null, isLoading: false })
    } catch (error) {
      if (error instanceof Error)
        set({ error: error?.message, isLoading: false })
    }
  },
}))
