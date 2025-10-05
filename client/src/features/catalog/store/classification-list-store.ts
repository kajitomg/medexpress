import {
  DeviceSectionBase,
  DeviceSectionListResponse,
} from "@/entities/device-section/model"
import { DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

export interface ClassificationListState {
  list?: (DeviceSectionBase & DocumentServices)[]
  isLoading: boolean
  error?: string
}

interface ClassificationListActions {
  setList: (list: (DeviceSectionBase & DocumentServices)[]) => void
  loadList: <
    F extends (
      ...args: Parameters<F>
    ) => Promise<
      DeviceSectionListResponse<DeviceSectionBase & DocumentServices>
    >,
  >(
    fn: F,
    ...args: Parameters<F>
  ) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type ClassificationListStore = ClassificationListState &
  ClassificationListActions

const defaultInitState: ClassificationListState = {
  list: undefined,
  isLoading: false,
  error: undefined,
}

export const createClassificationListStore = (
  initState: Partial<ClassificationListState> = defaultInitState
) =>
  create<ClassificationListStore>((set) => ({
    ...{ ...defaultInitState, ...initState },

    setList: (list) => set({ list }),

    loadList: async (fn, ...args) => {
      try {
        set({ isLoading: true })
        const response = await fn(...args)
        set({ list: response.data })
      } catch {
        return set({ error: "Что-то пошло не так" })
      } finally {
        set({ isLoading: false })
      }
    },

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
