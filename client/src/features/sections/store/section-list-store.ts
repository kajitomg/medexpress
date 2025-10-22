import { StrapiComponentBase, StrapiOptional } from "@/shared/model/strapi"
import { create } from "zustand"

export interface SectionListState<T extends StrapiComponentBase<string>[]> {
  sections?: StrapiOptional<T>
  isLoading: boolean
  error?: string
}

export type SectionListStore<T extends StrapiComponentBase<string>[]> =
  SectionListState<T>

const defaultInitState = <T extends StrapiComponentBase<string>[]>() =>
  ({
    sections: undefined,
    isLoading: false,
    error: undefined,
  }) as SectionListState<T>

export const createSectionListStore = <T extends StrapiComponentBase<string>[]>(
  initState: Partial<SectionListState<T>> = {}
) =>
  create<SectionListStore<T>>(() => ({
    ...{ ...defaultInitState(), ...initState },
  }))
