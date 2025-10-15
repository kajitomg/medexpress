"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const {
  Provider: DeviceSectionDetailsProvider,
  useStore: useDeviceSectionDetailsStore,
} = createStoreBaseItemProvider<DeviceSectionBase & DocumentServices>(
  "DeviceSectionDetails"
)

export { DeviceSectionDetailsProvider, useDeviceSectionDetailsStore }
