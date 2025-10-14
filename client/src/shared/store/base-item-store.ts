import { create } from "zustand"

export interface BaseItemState<T> {
  item?: T
  isLoading: boolean
  error?: string
}

interface BaseItemActions<T> {
  setItem: (item?: T) => void

  loadItem: <
    A extends { data: T },
    F extends (...args: Parameters<F>) => Promise<A>,
  >(
    fn: F,
    ...args: Parameters<F>
  ) => Promise<A | undefined>
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
  reset: () => void
}

export type BaseItemStore<T> = BaseItemState<T> & BaseItemActions<T>

const defaultInitState: BaseItemState<undefined> = {
  item: undefined,
  isLoading: false,
  error: undefined,
}

export const createBaseItemStore = <T>(
  initState: Partial<BaseItemState<T>> = {}
) => {
  return create<BaseItemStore<T>>((set) => ({
    ...{ ...defaultInitState, ...initState },

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
