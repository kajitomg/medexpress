"use client"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { createStoreBaseListProvider } from "@/shared/provider"

const { Provider: DeviceTypeListProvider, useStore: useDeviceTypeListStore } =
  createStoreBaseListProvider<DeviceTypeBase>("DeviceTypeList")

export { DeviceTypeListProvider, useDeviceTypeListStore }
