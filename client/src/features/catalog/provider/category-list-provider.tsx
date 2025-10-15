"use client"

import { CategoryBase } from "@/entities/category/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseListProvider } from "@/shared/provider"

const { Provider: CategoryListProvider, useStore: useCategoryListStore } =
  createStoreBaseListProvider<CategoryBase & DocumentServices>("CategoryList")

export { CategoryListProvider, useCategoryListStore }
