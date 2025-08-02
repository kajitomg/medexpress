import { CollectionBase } from "@/entities/collection/model"
import { DocumentServices } from "@/shared/model/document"
import { create } from "zustand"

export interface CollectionsListState {
  collections?: (CollectionBase & DocumentServices)[]
  isLoading: boolean
  error?: string
}

interface CollectionsListActions {
  setCollections: (collections: (CollectionBase & DocumentServices)[]) => void
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

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
