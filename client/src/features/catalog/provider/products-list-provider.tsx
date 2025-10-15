"use client"

import { ProductBase } from "@/entities/product/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseListProvider } from "@/shared/provider"

const { Provider: ProductsListProvider, useStore: useProductsListStore } =
  createStoreBaseListProvider<ProductBase & DocumentServices>("ProductsList")

export { ProductsListProvider, useProductsListStore }
