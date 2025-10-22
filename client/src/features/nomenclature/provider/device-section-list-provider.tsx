"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { createStoreBaseListProvider } from "@/shared/provider"

const {
  Provider: DeviceSectionListProvider,
  useStore: useDeviceSectionListStore,
} = createStoreBaseListProvider<DeviceSectionBase>("DeviceSectionList")

export { DeviceSectionListProvider, useDeviceSectionListStore }
