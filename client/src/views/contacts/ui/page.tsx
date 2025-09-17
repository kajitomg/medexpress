"use client"

import { PageSections } from "@/entities/page/model/page"
import { createSectionsStore } from "@/features/sections/provider"
import {
  selectSectionItemByName,
  selectSectionListItemByType,
} from "@/features/sections/store"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { SectionContactForm } from "@/views/contacts/ui/section-contact-form"
import { SectionContactsDetails } from "@/views/contacts/ui/section-contacts-details"
import { SectionFaq } from "@/views/contacts/ui/section-faq"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"

const useSectionsStore = createSectionsStore<PageSections[]>()

const Page = () => {
  const contactDetails = useSectionsStore(
    selectSectionItemByName("elements.contacts-details")
  )
  const contactForm = useSectionsStore(
    selectSectionItemByName("sections.contact-form")
  )
  const hero = useSectionsStore(selectSectionItemByName("sections.hero"))
  const faq = useSectionsStore(selectSectionListItemByType("faq"))

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
