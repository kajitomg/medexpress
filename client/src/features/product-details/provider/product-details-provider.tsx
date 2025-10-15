"use client"

import { ProductBase } from "@/entities/product/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const { Provider: ProductDetailsProvider, useStore: useProductDetailsStore } =
  createStoreBaseItemProvider<ProductBase & DocumentServices>("ProductDetails")

export { ProductDetailsProvider, useProductDetailsStore }
