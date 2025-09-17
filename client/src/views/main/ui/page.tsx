"use client"

import { PageSections } from "@/entities/page/model/page"
import { createSectionsStore } from "@/features/sections/provider"
import {
  selectSectionItemByName,
  selectSectionListItemByType,
} from "@/features/sections/store"
import { SectionContactForm } from "@/views/main/ui/section-contact-form"
import { SectionFaq } from "@/views/main/ui/section-faq"
import { SectionHero } from "@/views/main/ui/section-hero"
import { SectionServiceProcess } from "@/views/main/ui/section-service-process"
import { SectionStandOut } from "@/views/main/ui/section-stand-out"
import { Services } from "@/views/main/ui/services"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import * as React from "react"
import { useCallback, useRef } from "react"

const useSectionsStore = createSectionsStore<PageSections[]>()

const Page = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const faq = useSectionsStore(selectSectionListItemByType("faq"))
  const standOut = useSectionsStore(selectSectionListItemByType("standOut"))
  const serviceProcesses = useSectionsStore(
    selectSectionListItemByType("serviceProcesses")
  )
  const contactForm = useSectionsStore(
    selectSectionItemByName("sections.contact-form")
  )
  const mainPageHero = useSectionsStore(
    selectSectionItemByName("elements.main-page-hero")
  )
  const mainPageServices = useSectionsStore(
    selectSectionItemByName("elements.main-page-services")
  )

  const onScrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }, [])

  return (
    <ContactFormProvider>
      <SectionHero onScrollToForm={onScrollToForm} data={mainPageHero} />
      <SectionStandOut data={standOut} />
      <Services onScrollToForm={onScrollToForm} data={mainPageServices} />
      <SectionServiceProcess data={serviceProcesses} />
      <SectionContactForm formRef={formRef} data={contactForm} />
      <SectionFaq data={faq} />
    </ContactFormProvider>
  )
}

export { Page }
