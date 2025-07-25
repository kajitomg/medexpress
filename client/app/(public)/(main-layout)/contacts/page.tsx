import { ContactsPage } from "@/pages/contacts/ui"
import { ContactFormModeProvider } from "@/widgets/contact-form/provider"
import * as React from "react"

const Contacts = () => {
  return (
    <ContactFormModeProvider>
      <ContactsPage />
    </ContactFormModeProvider>
  )
}

export default Contacts
