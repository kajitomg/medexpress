import { PageSections } from "@/shared/model/strapi"
import { create } from "zustand"

export interface HeaderState {
  sections?: PageSections[]
  isLoading: boolean
  error?: string
}

export type HeaderStore = HeaderState

const defaultInitState: HeaderState = {
  sections: undefined,
  isLoading: false,
  error: undefined,
}

export const createHeaderStore = (
  initState: Partial<HeaderState> = defaultInitState
) =>
  create<HeaderStore>(() => ({
    ...{ ...defaultInitState, ...initState },
  }))
