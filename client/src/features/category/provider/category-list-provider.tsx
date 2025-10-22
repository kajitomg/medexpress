"use client"

import { CategoryBase } from "@/entities/category/model"
import { createStoreBaseListProvider } from "@/shared/provider"

const { Provider: CategoryListProvider, useStore: useCategoryListStore } =
  createStoreBaseListProvider<CategoryBase>("CategoryList")

export { CategoryListProvider, useCategoryListStore }
