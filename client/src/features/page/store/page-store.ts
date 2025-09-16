import { PageSections } from "@/shared/model/strapi"
import { create } from "zustand"

export interface PageState {
  sections?: PageSections[]
  isLoading: boolean
  error?: string
}

export type PageStore = PageState

const defaultInitState: PageState = {
  sections: undefined,
  isLoading: false,
  error: undefined,
}

export const createPageStore = (initState: Partial<PageState> = {}) =>
  create<PageStore>(() => ({
    ...{ ...defaultInitState, ...initState },
  }))
