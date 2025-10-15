"use client"

import { CategoryBase } from "@/entities/category/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const { Provider: CategoryDetailsProvider, useStore: useCategoryDetailsStore } =
  createStoreBaseItemProvider<CategoryBase & DocumentServices>(
    "CategoryDetails"
  )

export { CategoryDetailsProvider, useCategoryDetailsStore }
