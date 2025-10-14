import {
  DeviceTypeBase,
  DeviceTypeListResponse,
} from "@/entities/device-type/model"
import { DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

export interface ClassificationTypeListState {
  list?: (DeviceTypeBase & DocumentServices)[]
  isLoading: boolean
  error?: string
}

interface ClassificationTypeListActions {
  setList: (list: (DeviceTypeBase & DocumentServices)[]) => void
  loadList: <
    T extends DeviceTypeListResponse<DeviceTypeBase & DocumentServices>,
    F extends (...args: Parameters<F>) => Promise<T>,
  >(
    fn: F,
    ...args: Parameters<F>
  ) => Promise<T | undefined>
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type ClassificationTypeListStore = ClassificationTypeListState &
  ClassificationTypeListActions

const defaultInitState: ClassificationTypeListState = {
  list: undefined,
  isLoading: false,
  error: undefined,
}

export const createClassificationTypeListStore = (
  initState: Partial<ClassificationTypeListState> = defaultInitState
) =>
  create<ClassificationTypeListStore>((set) => ({
    ...{ ...defaultInitState, ...initState },

    setList: (list) => set({ list }),

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

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
