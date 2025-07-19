"use client"

import { Faq } from "@/pages/main/ui/faq"
import { Hero } from "@/pages/main/ui/hero"
import { SectionContactForm } from "@/pages/main/ui/section-contact-form"
import { ServiceProcess } from "@/pages/main/ui/service-process"
import { Services } from "@/pages/main/ui/services"
import { StandOut } from "@/pages/main/ui/stand-out"
import {
  ContactFormModeProvider,
  ContactFormProvider,
} from "@/widgets/contact-form/provider"
import * as React from "react"
import { useCallback, useRef } from "react"

const MainPage = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const callbacks = {
    onScrollToForm: useCallback(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, [formRef]),
  }

  return (
    <ContactFormModeProvider>
      <ContactFormProvider>
        <Hero onScrollToForm={callbacks.onScrollToForm} />
        <StandOut />
        <Services onScrollToForm={callbacks.onScrollToForm} />
        <ServiceProcess />
        <SectionContactForm ref={formRef} />
        <Faq />
      </ContactFormProvider>
    </ContactFormModeProvider>
  )
}

export { MainPage }
