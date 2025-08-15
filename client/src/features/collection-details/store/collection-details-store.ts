import { CollectionBase } from "@/entities/collection/model"
import { DocumentServices } from "@/shared/model"
import { create } from "zustand"

export interface CollectionDetailsState {
  collection?: CollectionBase & DocumentServices
  isLoading: boolean
  error?: string
}

interface CollectionDetailsActions {
  setCollection: (collection: CollectionBase & DocumentServices) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type CollectionDetailsStore = CollectionDetailsState &
  CollectionDetailsActions

const defaultInitState: CollectionDetailsState = {
  collection: undefined,
  isLoading: false,
  error: undefined,
}

export const createCollectionDetailsStore = (
  initState: Partial<CollectionDetailsState> = defaultInitState
) =>
  create<CollectionDetailsStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setCollection: (collection) => set({ collection }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
