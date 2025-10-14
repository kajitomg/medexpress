import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface Offset {
  top?: number
  left?: number
}

export interface PageLayoutState {
  header?: HTMLElement
  offset: Offset
}

interface PageLayoutActions {
  setHeader: (header?: HTMLElement) => void
  setOffset: (offset: Partial<Offset>) => void
}

export type PageLayoutStore = PageLayoutState & PageLayoutActions

const defaultInitState: PageLayoutState = {
  offset: {},
}

export const createPageLayoutStore = (
  initState: Partial<PageLayoutState> = defaultInitState
) =>
  create<PageLayoutStore>()(
    immer((set) => ({
      ...{ ...defaultInitState, ...initState },
      setHeader: (header) => set({ header }),
      setOffset: (offset) =>
        set((state) => ({
          offset: {
            ...state.offset,
            ...offset,
          },
        })),
    }))
  )
