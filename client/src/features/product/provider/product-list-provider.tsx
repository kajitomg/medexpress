"use client"

import { ProductBase } from "@/entities/product/model"
import { createStoreBaseListProvider } from "@/shared/provider"

const { Provider: ProductListProvider, useStore: useProductListStore } =
  createStoreBaseListProvider<ProductBase>("ProductList")

export { ProductListProvider, useProductListStore }
