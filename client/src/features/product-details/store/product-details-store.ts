import { ProductBase } from "@/entities/product/model/product"
import { DocumentServices } from "@/shared/model"
import { create } from "zustand"

export interface ProductDetailsState {
  product?: ProductBase & DocumentServices
  isLoading: boolean
  error?: string
}

interface ProductDetailsActions {
  setProduct: (product: ProductBase & DocumentServices) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type ProductDetailsStore = ProductDetailsState & ProductDetailsActions

const defaultInitState: ProductDetailsState = {
  product: undefined,
  isLoading: false,
  error: undefined,
}

export const createProductDetailsStore = (
  initState: Partial<ProductDetailsState> = defaultInitState
) =>
  create<ProductDetailsStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setProduct: (product) => set({ product }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
