import { create } from "zustand"

export interface BaseListState<T> {
  list?: T[]
  isLoading: boolean
  error?: string
}

interface BaseListActions<T> {
  setList: (list?: T[]) => void

  loadList: <
    A extends { data: T[] },
    F extends (...args: Parameters<F>) => Promise<A>,
  >(
    fn: F,
    ...args: Parameters<F>
  ) => Promise<A | undefined>
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
  reset: () => void
}

export type BaseListStore<T> = BaseListState<T> & BaseListActions<T>

export const createBaseListStore = <T>() => {
  return create<BaseListStore<T>>((set) => ({
    list: undefined,
    isLoading: false,
    error: undefined,

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
