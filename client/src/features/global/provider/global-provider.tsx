"use client"

import { GlobalBase } from "@/entities/_single-types/global/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const { Provider: GlobalProvider, useStore: useGlobalStore } =
  createStoreBaseItemProvider<GlobalBase>("Global")

export { GlobalProvider, useGlobalStore }
