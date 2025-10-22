import { WithNamespace } from "@/shared/model/helpers"
import { StateCreator } from "zustand"
import { immer } from "zustand/middleware/immer"

export interface NomenclatureFilterState {
  nomenclatureSlug?: string
}

export interface NomenclatureFilterActions {
  setNomenclatureSlug: (nomenclatureSlug?: string) => void
}

export type NomenclatureFilterSlice = NomenclatureFilterState &
  NomenclatureFilterActions

export const defaultNomenclatureFilterInitState: NomenclatureFilterState = {
  nomenclatureSlug: undefined,
}

export type NomenclatureFilterStateWithNamespace = WithNamespace<
  NomenclatureFilterState,
  "filter"
>

export type NomenclatureFilterActionsWithNamespace = WithNamespace<
  NomenclatureFilterActions,
  "filter"
>

export type NomenclatureFilterSliceWithNamespace = WithNamespace<
  NomenclatureFilterSlice,
  "filter"
>

export const createNomenclatureFilterSlice = <
  T extends
    NomenclatureFilterSliceWithNamespace = NomenclatureFilterSliceWithNamespace,
>(
  initState: Partial<NomenclatureFilterState> = defaultNomenclatureFilterInitState
): StateCreator<
  T,
  [],
  [["zustand/immer", never]],
  NomenclatureFilterSliceWithNamespace
> =>
  immer((set) => ({
    filter: {
      ...defaultNomenclatureFilterInitState,
      ...initState,
      setNomenclatureSlug: (nomenclatureSlug) => {
        set((state) => {
          state.filter.nomenclatureSlug = nomenclatureSlug
        })
      },
    },
  }))
