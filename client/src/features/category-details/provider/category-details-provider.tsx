"use client"

import { CategoryBase } from "@/entities/category/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const { Provider: CategoryDetailsProvider, useStore: useCategoryDetailsStore } =
  createStoreBaseItemProvider<CategoryBase>("CategoryDetails")

export { CategoryDetailsProvider, useCategoryDetailsStore }
