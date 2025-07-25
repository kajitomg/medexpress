"use client"

import { SectionContactForm } from "@/pages/contacts/ui/section-contact-form"
import { SectionContactsDetails } from "@/pages/contacts/ui/section-contacts-details"
import { routes } from "@/shared/config/routes"
import {
  ContactFormMode,
  contactFormSchemaEmail,
  contactFormSchemaPhonenumber,
} from "@/widgets/contact-form/model"
import {
  ContactFormProvider,
  useContactFormModeStore,
} from "@/widgets/contact-form/provider"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"

const ContactsPage = () => {
  const mode = useContactFormModeStore((state) => state.mode)
  const schema =
    mode === ContactFormMode.EMAIL
      ? contactFormSchemaEmail
      : contactFormSchemaPhonenumber

  return (
    <ContactFormProvider schema={schema}>
      <PageHeroRoutes page={routes.CONTACTS} />
      <SectionContactsDetails />
      <SectionContactForm />
    </ContactFormProvider>
  )
}

export { ContactsPage }
