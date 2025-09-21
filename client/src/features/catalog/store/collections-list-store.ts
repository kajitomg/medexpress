import {
  CollectionBase,
  CollectionListResponse,
} from "@/entities/collection/model"
import { DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

export interface CollectionsListState {
  collections?: (CollectionBase & DocumentServices)[]
  isLoading: boolean
  error?: string
}

interface CollectionsListActions {
  setCollections: (collections: (CollectionBase & DocumentServices)[]) => void
  loadCollections: <
    F extends (
      ...args: Parameters<F>
    ) => Promise<CollectionListResponse<CollectionBase & DocumentServices>>,
  >(
    fn: F,
    ...args: Parameters<F>
  ) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type CollectionsListStore = CollectionsListState & CollectionsListActions

const defaultInitState: CollectionsListState = {
  collections: undefined,
  isLoading: false,
  error: undefined,
}

export const createCollectionsListStore = (
  initState: Partial<CollectionsListState> = defaultInitState
) =>
  create<CollectionsListStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setCollections: (collections) => set({ collections }),

    loadCollections: async (fn, ...args) => {
      try {
        set({ isLoading: true })
        const response = await fn(...args)
        set({ collections: response.data })
      } catch {
        return set({ error: "Что-то пошло не так" })
      } finally {
        set({ isLoading: false })
      }
    },

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
