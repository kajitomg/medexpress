"use client"

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"
import {
  createDeviceSectionDetailsStore,
  DeviceSectionDetailsStore,
} from "../store"

export type DeviceSectionDetailsStoreApi = ReturnType<
  typeof createDeviceSectionDetailsStore
>

export const DeviceSectionDetailsStoreContext = createContext<
  DeviceSectionDetailsStoreApi | undefined
>(undefined)

export interface DeviceSectionDetailsProviderProps {
  children: ReactNode
  initialState?: Partial<DeviceSectionDetailsStore>
}

export const DeviceSectionDetailsProvider = ({
  children,
  initialState,
}: DeviceSectionDetailsProviderProps) => {
  const storeRef = useRef<DeviceSectionDetailsStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createDeviceSectionDetailsStore(initialState)
  }

  return (
    <DeviceSectionDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </DeviceSectionDetailsStoreContext.Provider>
  )
}

export const useDeviceSectionDetailsStore = <T,>(
  selector: (store: DeviceSectionDetailsStore) => T
): T => {
  const context = useContext(DeviceSectionDetailsStoreContext)

  if (!context) {
    throw new Error(
      `useDeviceSectionDetailsStore must be used within DeviceSectionDetailsProvider`
    )
  }

  return useStore(context, selector)
}
