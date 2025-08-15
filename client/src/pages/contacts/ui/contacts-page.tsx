"use client"

import { SectionContactForm } from "@/pages/contacts/ui/section-contact-form"
import { SectionContactsDetails } from "@/pages/contacts/ui/section-contacts-details"
import { SectionFaq } from "@/pages/contacts/ui/section-faq"
import { routes } from "@/shared/config/routes"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"

const ContactsPage = () => {
  return (
    <ContactFormProvider>
      <PageHeroRoutes page={routes.CONTACTS} />
      <SectionContactsDetails />
      <SectionContactForm />
      <SectionFaq />
    </ContactFormProvider>
  )
}

export { ContactsPage }
