"use client"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { DocumentServices } from "@/shared/model"
import { createStoreBaseListProvider } from "@/shared/provider"

const { Provider: DeviceTypeListProvider, useStore: useDeviceTypeListStore } =
  createStoreBaseListProvider<DeviceTypeBase & DocumentServices>(
    "DeviceTypeList"
  )

export { DeviceTypeListProvider, useDeviceTypeListStore }
