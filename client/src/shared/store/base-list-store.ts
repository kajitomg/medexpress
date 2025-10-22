import { StrapiBase, StrapiListResponse } from "@/shared/model/strapi"
import { create } from "zustand"

export interface BaseListState<T extends StrapiBase> {
  list?: T[]
  isLoading: boolean
  error?: string
}

interface BaseListActions<T extends StrapiBase> {
  setList: (list?: T[]) => void
  loadList: <
    F extends (...args: Parameters<F>) => Promise<StrapiListResponse<T>>,
  >(
    fn: F,
    ...args: Parameters<F>
  ) => Promise<StrapiListResponse<T> | undefined>
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
  reset: () => void
}

export type BaseListStore<T extends StrapiBase> = BaseListState<T> &
  BaseListActions<T>

const defaultInitState = <T extends StrapiBase>(): BaseListState<T> => ({
  list: undefined,
  isLoading: false,
  error: undefined,
})

export const createBaseListStore = <T extends StrapiBase>(
  initState: Partial<BaseListState<T>> = {}
) => {
  return create<BaseListStore<T>>((set) => ({
    ...{ ...defaultInitState<T>(), ...initState },

    setList: (list) => set({ list, error: undefined }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error, isLoading: false }),

    loadList: async (fn, ...args) => {
      try {
        set({ isLoading: true })
        const response = await fn(...args)
        set({ list: response.data })
        return response
      } catch {
        set({ error: "Что-то пошло не так" })
      } finally {
        set({ isLoading: false })
      }
    },

    reset: () => set({ list: undefined, isLoading: false, error: undefined }),
  }))
}
