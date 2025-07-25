"use client"

import {
  type ContactFormModeStore,
  createContactFormModeStore,
} from "@/widgets/contact-form/store"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"

export type ContactFormModeStoreApi = ReturnType<
  typeof createContactFormModeStore
>

export const ContactFormModeStoreContext = createContext<
  ContactFormModeStoreApi | undefined
>(undefined)

export interface ContactFormModeProviderProps {
  children: ReactNode
}

export const ContactFormModeProvider = ({
  children,
}: ContactFormModeProviderProps) => {
  const storeRef = useRef<ContactFormModeStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createContactFormModeStore()
  }

  return (
    <ContactFormModeStoreContext.Provider value={storeRef.current}>
      {children}
    </ContactFormModeStoreContext.Provider>
  )
}

export const useContactFormModeStore = <T,>(
  selector: (store: ContactFormModeStore) => T
): T => {
  const context = useContext(ContactFormModeStoreContext)

  if (!context) {
    throw new Error(
      `useContactFormModeStore must be used within ContactFormModeProvider`
    )
  }

  return useStore(context, selector)
}
