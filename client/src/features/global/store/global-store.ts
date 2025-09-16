import { GlobalBase } from "@/entities/global/model"
import { DocumentServices } from "@/shared/model"
import { create } from "zustand"

export interface GlobalState {
  data?: GlobalBase & DocumentServices
  isLoading: boolean
  error?: string
}

export type GlobalStore = GlobalState

const defaultInitState: GlobalState = {
  data: undefined,
  isLoading: false,
  error: undefined,
}

export const createGlobalStore = (
  initState: Partial<GlobalState> = defaultInitState
) =>
  create<GlobalStore>(() => ({
    ...{ ...defaultInitState, ...initState },
  }))
