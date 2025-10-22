import {
  StrapiBase,
  StrapiItemResponse,
  StrapiOptional,
} from "@/shared/model/strapi"
import { create } from "zustand"

export interface BaseItemState<T extends StrapiBase> {
  item?: StrapiOptional<T>
  isLoading: boolean
  error?: string
}

interface BaseItemActions<T extends StrapiBase> {
  setItem: (item?: StrapiOptional<T>) => void
  loadItem: <
    F extends (...args: Parameters<F>) => Promise<StrapiItemResponse<T>>,
  >(
    fn: F,
    ...args: Parameters<F>
  ) => Promise<StrapiItemResponse<T> | undefined>
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
  reset: () => void
}

export type BaseItemStore<T extends StrapiBase> = BaseItemState<T> &
  BaseItemActions<T>

const defaultInitState = <T extends StrapiBase>(): BaseItemState<T> => ({
  item: undefined,
  isLoading: false,
  error: undefined,
})

export const createBaseItemStore = <T extends StrapiBase>(
  initState: Partial<BaseItemState<T>> = {}
) => {
  return create<BaseItemStore<T>>((set) => ({
    ...{ ...defaultInitState<T>(), ...initState },

    setItem: (item) => set({ item, error: undefined }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error, isLoading: false }),

    loadItem: async (fn, ...args) => {
      try {
        set({ isLoading: true })
        const response = await fn(...args)
        set({ item: response.data })
        return response
      } catch {
        set({ error: "Что-то пошло не так" })
      } finally {
        set({ isLoading: false })
      }
    },

    reset: () => set({ item: undefined, isLoading: false, error: undefined }),
  }))
}
