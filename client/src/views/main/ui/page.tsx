"use client"

import { usePageStore } from "@/features/page/provider"
import {
  selectSectionItemByName,
  selectSectionListItemByType,
} from "@/features/page/store"
import { SectionContactForm } from "@/views/main/ui/section-contact-form"
import { SectionFaq } from "@/views/main/ui/section-faq"
import { SectionHero } from "@/views/main/ui/section-hero"
import { SectionServiceProcess } from "@/views/main/ui/section-service-process"
import { SectionStandOut } from "@/views/main/ui/section-stand-out"
import { Services } from "@/views/main/ui/services"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import * as React from "react"
import { useCallback, useRef } from "react"

const Page = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const faq = usePageStore(selectSectionListItemByType("faq"))
  const standOut = usePageStore(selectSectionListItemByType("standOut"))
  const serviceProcesses = usePageStore(
    selectSectionListItemByType("serviceProcesses")
  )
  const contactForm = usePageStore(
    selectSectionItemByName("sections.contact-form")
  )
  const mainPageHero = usePageStore(
    selectSectionItemByName("elements.main-page-hero")
  )
  const mainPageServices = usePageStore(
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
