import { DeviceTypeBase } from "@/entities/device-type/model"
import { DocumentServices } from "@/shared/model"
import { create } from "zustand"

export interface DeviceTypeDetailsState {
  item?: DeviceTypeBase & DocumentServices
  isLoading: boolean
  error?: string
}

interface DeviceTypeDetailsActions {
  setItem: (item: DeviceTypeBase & DocumentServices) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type DeviceTypeDetailsStore = DeviceTypeDetailsState &
  DeviceTypeDetailsActions

const defaultInitState: DeviceTypeDetailsState = {
  item: undefined,
  isLoading: false,
  error: undefined,
}

export const createDeviceTypeDetailsStore = (
  initState: Partial<DeviceTypeDetailsState> = defaultInitState
) =>
  create<DeviceTypeDetailsStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setItem: (item) => set({ item }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
