"use client"

import { usePageStore } from "@/features/page/provider"
import {
  selectSectionItemByName,
  selectSectionListItemByType,
} from "@/features/page/store"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { SectionContactForm } from "@/views/contacts/ui/section-contact-form"
import { SectionContactsDetails } from "@/views/contacts/ui/section-contacts-details"
import { SectionFaq } from "@/views/contacts/ui/section-faq"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"

const Page = () => {
  const contactDetails = usePageStore(
    selectSectionItemByName("elements.contacts-details")
  )
  const contactForm = usePageStore(
    selectSectionItemByName("sections.contact-form")
  )
  const hero = usePageStore(selectSectionItemByName("sections.hero"))
  const faq = usePageStore(selectSectionListItemByType("faq"))

  return (
    <ContactFormProvider>
      <PageHeroRoutes
        page={routes.CONTACTS}
        title={hero?.title}
        image={hero?.picture?.url && imageUrlBuilder(hero?.picture?.url)}
      />
      <SectionContactsDetails data={contactDetails} />
      <SectionContactForm data={contactForm} />
      <SectionFaq data={faq} />
    </ContactFormProvider>
  )
}

export { Page }
