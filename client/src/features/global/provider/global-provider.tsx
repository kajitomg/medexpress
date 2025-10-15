"use client"

import { GlobalBase } from "@/entities/_single-types/global/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const { Provider: GlobalProvider, useStore: useGlobalStore } =
  createStoreBaseItemProvider<GlobalBase & DocumentServices>("Global")

export { GlobalProvider, useGlobalStore }
