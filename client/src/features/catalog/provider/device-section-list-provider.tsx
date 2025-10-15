"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseListProvider } from "@/shared/provider"

const {
  Provider: DeviceSectionListProvider,
  useStore: useDeviceSectionListStore,
} = createStoreBaseListProvider<DeviceSectionBase & DocumentServices>(
  "DeviceSectionList"
)

export { DeviceSectionListProvider, useDeviceSectionListStore }
