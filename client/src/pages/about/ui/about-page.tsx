"use client"

import { SectionAboutDescription } from "@/pages/about/ui/section-about-description"
import { SectionAboutHero } from "@/pages/about/ui/section-about-hero"
import { SectionContactForm } from "@/pages/about/ui/section-contact-form"
import { SectionLicenses } from "@/pages/about/ui/section-licenses"
import { SectionStandOut } from "@/pages/about/ui/section-stand-out"
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
import { useCallback, useRef } from "react"

const AboutPage = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const mode = useContactFormModeStore((state) => state.mode)
  const schema =
    mode === ContactFormMode.EMAIL
      ? contactFormSchemaEmail
      : contactFormSchemaPhonenumber

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
      <PageHeroRoutes page={routes.ABOUT} />
      <SectionAboutHero onScrollToForm={callbacks.onScrollToForm} />
      <SectionAboutDescription />
      <SectionStandOut />
      <SectionContactForm ref={formRef} />
      <SectionLicenses />
    </ContactFormProvider>
  )
}

export { AboutPage }
