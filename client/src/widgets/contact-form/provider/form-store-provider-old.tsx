"use client"

import { createFormStore, type FormStore } from "@/shared/store"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from "zustand"

export type ContactFormStoreApi = ReturnType<
  typeof createFormStore<ContactFormSchema>
>

export const ContactFormStoreContext = createContext<
  ContactFormStoreApi | undefined
>(undefined)

export interface ContactFormProviderProps {
  children: ReactNode
}

export const ContactFormProvider = ({ children }: ContactFormProviderProps) => {
  const storeRef = useRef<ContactFormStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createFormStore<ContactFormSchema>()
  }

  return (
    <ContactFormStoreContext.Provider value={storeRef.current}>
      {children}
    </ContactFormStoreContext.Provider>
  )
}

export const useContactFormStore = <T,>(
  selector: (store: FormStore<ContactFormSchema>) => T
): T => {
  const context = useContext(ContactFormStoreContext)

  if (!context) {
    throw new Error(
      `useContactFormStore must be used within ContactFormProvider`
    )
  }

  return useStore(context, selector)
}
