"use client"

import { SectionContactForm } from "@/pages/main/ui/section-contact-form"
import { SectionFaq } from "@/pages/main/ui/section-faq"
import { SectionHero } from "@/pages/main/ui/section-hero"
import { SectionServiceProcess } from "@/pages/main/ui/section-service-process"
import { SectionStandOut } from "@/pages/main/ui/section-stand-out"
import { Services } from "@/pages/main/ui/services"
import { ContactFormModeSchema } from "@/widgets/contact-form/model"
import {
  ContactFormProvider,
  useContactFormModeStore,
} from "@/widgets/contact-form/provider"
import * as React from "react"
import { useCallback, useRef } from "react"

const MainPage = () => {
  const formRef = useRef<HTMLDivElement>(null)

  const mode = useContactFormModeStore((state) => state.mode)
  const schema = ContactFormModeSchema[mode]

  const callbacks = {
    onScrollToForm: useCallback(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, [formRef]),
  }
  return (
    <ContactFormProvider schema={schema}>
      <SectionHero onScrollToForm={callbacks.onScrollToForm} />
      <SectionStandOut />
      <Services onScrollToForm={callbacks.onScrollToForm} />
      <SectionServiceProcess />
      <SectionContactForm formRef={formRef} />
      <SectionFaq />
    </ContactFormProvider>
  )
}

export { MainPage }
