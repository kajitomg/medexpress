"use client"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { createStoreBaseItemProvider } from "@/shared/provider"

const {
  Provider: DeviceTypeDetailsProvider,
  useStore: useDeviceTypeDetailsStore,
} = createStoreBaseItemProvider<DeviceTypeBase>("DeviceTypeDetails")

export { DeviceTypeDetailsProvider, useDeviceTypeDetailsStore }
