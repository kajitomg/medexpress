"use client"

import { routes } from "@/shared/config/routes"
import { SectionAboutDescription } from "@/views/about/ui/section-about-description"
import { SectionAboutHero } from "@/views/about/ui/section-about-hero"
import { SectionContactForm } from "@/views/about/ui/section-contact-form"
import { SectionLicenses } from "@/views/about/ui/section-licenses"
import { SectionStandOut } from "@/views/about/ui/section-stand-out"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { useCallback, useRef } from "react"

const Page = () => {
  const formRef = useRef<HTMLDivElement>(null)

  const callbacks = {
    onScrollToForm: useCallback(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, [formRef]),
  }

  return (
    <ContactFormProvider>
      <PageHeroRoutes page={routes.ABOUT} />
      <SectionAboutHero onScrollToForm={callbacks.onScrollToForm} />
      <SectionAboutDescription />
      <SectionStandOut />
      <SectionContactForm formRef={formRef} />
      <SectionLicenses />
    </ContactFormProvider>
  )
}

export { Page }
