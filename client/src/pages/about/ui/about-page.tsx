"use client"

import { SectionAboutDescription } from "@/pages/about/ui/section-about-description"
import { SectionAboutHero } from "@/pages/about/ui/section-about-hero"
import { SectionContactForm } from "@/pages/about/ui/section-contact-form"
import { SectionLicenses } from "@/pages/about/ui/section-licenses"
import { SectionStandOut } from "@/pages/about/ui/section-stand-out"
import { routes } from "@/shared/config/routes"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { useCallback, useRef } from "react"

const AboutPage = () => {
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

export { AboutPage }
