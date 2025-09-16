import { PageSections } from "@/shared/model/strapi"
import { create } from "zustand"

export interface FooterState {
  sections?: PageSections[]
  isLoading: boolean
  error?: string
}

export type FooterStore = FooterState

const defaultInitState: FooterState = {
  sections: undefined,
  isLoading: false,
  error: undefined,
}

export const createFooterStore = (
  initState: Partial<FooterState> = defaultInitState
) =>
  create<FooterStore>(() => ({
    ...{ ...defaultInitState, ...initState },
  }))
