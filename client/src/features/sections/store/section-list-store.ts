import { create } from "zustand"

export interface SectionListState<T extends { __component: string }[]> {
  sections?: T
  isLoading: boolean
  error?: string
}

export type SectionListStore<T extends { __component: string }[]> =
  SectionListState<T>

const defaultInitState = <T extends { __component: string }[]>() =>
  ({
    sections: undefined,
    isLoading: false,
    error: undefined,
  }) as SectionListState<T>

export const createSectionListStore = <T extends { __component: string }[]>(
  initState: Partial<SectionListState<T>> = {}
) =>
  create<SectionListStore<T>>(() => ({
    ...{ ...defaultInitState(), ...initState },
  }))
