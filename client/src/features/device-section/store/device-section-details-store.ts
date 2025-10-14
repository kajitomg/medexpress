import { DeviceSectionBase } from "@/entities/device-section/model"
import { DocumentServices } from "@/shared/model"
import { create } from "zustand"

export interface DeviceSectionDetailsState {
  item?: DeviceSectionBase & DocumentServices
  isLoading: boolean
  error?: string
}

interface DeviceSectionDetailsActions {
  setItem: (item: DeviceSectionBase & DocumentServices) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type DeviceSectionDetailsStore = DeviceSectionDetailsState &
  DeviceSectionDetailsActions

const defaultInitState: DeviceSectionDetailsState = {
  item: undefined,
  isLoading: false,
  error: undefined,
}

export const createDeviceSectionDetailsStore = (
  initState: Partial<DeviceSectionDetailsState> = defaultInitState
) =>
  create<DeviceSectionDetailsStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setItem: (item) => set({ item }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
