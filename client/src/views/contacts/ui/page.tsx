"use client"

import { routes } from "@/shared/config/routes"
import { SectionContactForm } from "@/views/contacts/ui/section-contact-form"
import { SectionContactsDetails } from "@/views/contacts/ui/section-contacts-details"
import { SectionFaq } from "@/views/contacts/ui/section-faq"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"

const Page = () => {
  return (
    <ContactFormProvider>
      <PageHeroRoutes page={routes.CONTACTS} />
      <SectionContactsDetails />
      <SectionContactForm />
      <SectionFaq />
    </ContactFormProvider>
  )
}

export { Page }
