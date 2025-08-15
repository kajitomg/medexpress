import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface Offset {
  top?: number
  left?: number
}

export interface PageLayoutState {
  root?: HTMLElement
  aside?: HTMLElement
  header?: HTMLElement
  main?: HTMLElement
  content?: HTMLElement
  footer?: HTMLElement
  offset: Offset
}

interface PageLayoutActions {
  setRoot: (root?: HTMLElement) => void
  setAside: (aside?: HTMLElement) => void
  setHeader: (header?: HTMLElement) => void
  setMain: (main?: HTMLElement) => void
  setContent: (content?: HTMLElement) => void
  setFooter: (footer?: HTMLElement) => void
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
      setRoot: (root) => set({ root }),
      setAside: (aside) => set({ aside }),
      setHeader: (header) => set({ header }),
      setMain: (main) => set({ main }),
      setContent: (content) => set({ content }),
      setFooter: (footer) => set({ footer }),
      setOffset: (offset) =>
        set((state) => ({
          offset: {
            ...state.offset,
            ...offset,
          },
        })),
    }))
  )
