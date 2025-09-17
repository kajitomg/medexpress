import { create } from "zustand"

export interface SectionsState<
  T extends { __component: string }[] | undefined = undefined,
> {
  sections?: T
  isLoading: boolean
  error?: string
}

export type SectionsStore<
  T extends { __component: string }[] | undefined = undefined,
> = SectionsState<T>

const defaultInitState: SectionsState = {
  sections: undefined,
  isLoading: false,
  error: undefined,
}

export const createSectionsStore = <
  T extends { __component: string }[] | undefined = undefined,
>(
  initState: Partial<SectionsState<T>> = {}
) =>
  create<SectionsStore<T>>(() => ({
    ...{ ...defaultInitState, ...initState },
  }))
