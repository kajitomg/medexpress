"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  createDeviceTypeDetailsStore,
  DeviceTypeDetailsState,
  DeviceTypeDetailsStore,
} from "../store"

export type DeviceTypeDetailsStoreApi = ReturnType<
  typeof createDeviceTypeDetailsStore
>

export const DeviceTypeDetailsStoreContext = createContext<
  DeviceTypeDetailsStoreApi | undefined
>(undefined)

export interface DeviceTypeDetailsProviderProps {
  children: ReactNode
  initialState?: Partial<DeviceTypeDetailsState>
}

export const DeviceTypeDetailsProvider = ({
  children,
  initialState,
}: DeviceTypeDetailsProviderProps) => {
  const storeRef = useRef<DeviceTypeDetailsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createDeviceTypeDetailsStore(initialState)
  }

  return (
    <DeviceTypeDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </DeviceTypeDetailsStoreContext.Provider>
  )
}

export const useDeviceTypeDetailsStore = <T,>(
  selector: (store: DeviceTypeDetailsStore) => T
): T => {
  const context = useContext(DeviceTypeDetailsStoreContext)

  if (!context) {
    throw new Error(
      `useDeviceTypeDetailsStore must be used within DeviceTypeDetailsProvider`
    )
  }

  return useStore(context, selector)
}
