import { ContactFormMode } from "@/widgets/contact-form/model"
import { create } from "zustand"

interface ContactFormModeState {
  mode: ContactFormMode
}

interface ContactFormModeActions {
  setMode: (mode: ContactFormMode) => void
}

export type ContactFormModeStore = ContactFormModeState & ContactFormModeActions

const defaultInitState: ContactFormModeState = {
  mode: ContactFormMode.EMAIL,
}

export const createContactFormModeStore = (
  initState: ContactFormModeState = defaultInitState
) =>
  create<ContactFormModeStore>((set) => ({
    ...initState,
    setMode: (mode: ContactFormMode) => set(() => ({ mode })),
  }))
