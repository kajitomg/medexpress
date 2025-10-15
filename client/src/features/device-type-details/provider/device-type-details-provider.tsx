"use client"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const {
  Provider: DeviceTypeDetailsProvider,
  useStore: useDeviceTypeDetailsStore,
} = createStoreBaseItemProvider<DeviceTypeBase & DocumentServices>(
  "DeviceTypeDetails"
)

export { DeviceTypeDetailsProvider, useDeviceTypeDetailsStore }
