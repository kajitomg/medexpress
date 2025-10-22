"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const {
  Provider: DeviceSectionDetailsProvider,
  useStore: useDeviceSectionDetailsStore,
} = createStoreBaseItemProvider<DeviceSectionBase>("DeviceSectionDetails")

export { DeviceSectionDetailsProvider, useDeviceSectionDetailsStore }
