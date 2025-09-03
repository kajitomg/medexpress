import { SettingsBase, SettingsItemResponse } from "@/entities/settings/model"
import { DocumentServices } from "@/shared/model"
import { create } from "zustand"

export interface SettingsState {
  data?: SettingsBase & DocumentServices
  isLoading: boolean
  error?: string
}

interface SettingsActions {
  setSettings: (data?: SettingsBase & DocumentServices) => void
  loadSettings: (
    fn: () => Promise<SettingsItemResponse<SettingsBase & DocumentServices>>
  ) => void
  setLoading: (loading: boolean) => void
  setError: (error?: string) => void
}

export type SettingsStore = SettingsState & SettingsActions

const defaultInitState: SettingsState = {
  data: undefined,
  isLoading: false,
  error: undefined,
}

export const createSettingsStore = (
  initState: Partial<SettingsState> = defaultInitState
) =>
  create<SettingsStore>((set) => ({
    ...{ ...defaultInitState, ...initState },
    setSettings: (data) => set({ data }),
    loadSettings: async (fn) => {
      try {
        set({ isLoading: true })
        const response = await fn()
        set({ data: response.data })
      } catch {
        return set({ error: "Что-то пошло не так" })
      } finally {
        set({ isLoading: false })
      }
    },

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
  }))
