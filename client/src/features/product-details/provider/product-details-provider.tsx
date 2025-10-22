"use client"

import { ProductBase } from "@/entities/product/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const { Provider: ProductDetailsProvider, useStore: useProductDetailsStore } =
  createStoreBaseItemProvider<ProductBase>("ProductDetails")

export { ProductDetailsProvider, useProductDetailsStore }
