"use client"

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

  const onScrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }, [])

  return (
    <ContactFormProvider>
      <SectionHero onScrollToForm={onScrollToForm} />
      <SectionStandOut />
      <Services onScrollToForm={onScrollToForm} />
      <SectionServiceProcess />
      <SectionContactForm formRef={formRef} />
      <SectionFaq />
    </ContactFormProvider>
  )
}

export { Page }
