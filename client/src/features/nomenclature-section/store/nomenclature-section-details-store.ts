import { DeviceSectionBase } from "@/entities/device-section/model"
import { DocumentServices } from "@/shared/model"
import { create } from "zustand"

export interface NomenclatureSectionDetailsState {
  item?: DeviceSectionBase & DocumentServices
  isLoading: boolean
  error?: string
}

interface NomenclatureSectionDetailsActions {
  setItem: (item: DeviceSectionBase & DocumentServices) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type NomenclatureSectionDetailsStore = NomenclatureSectionDetailsState &
  NomenclatureSectionDetailsActions

const defaultInitState: NomenclatureSectionDetailsState = {
  item: undefined,
  isLoading: false,
  error: undefined,
}

export const createNomenclatureSectionDetailsStore = (
  initState: Partial<NomenclatureSectionDetailsState> = defaultInitState
) =>
  create<NomenclatureSectionDetailsStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setItem: (item) => set({ item }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
