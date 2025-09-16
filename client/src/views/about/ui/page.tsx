"use client"

import { usePageStore } from "@/features/page/provider"
import {
  selectSectionItemByName,
  selectSectionListItemByType,
} from "@/features/page/store"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
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
  const aboutHero = usePageStore(selectSectionItemByName("elements.about-hero"))
  const aboutInfo = usePageStore(selectSectionItemByName("elements.about-info"))
  const hero = usePageStore(selectSectionItemByName("sections.hero"))
  const standOut = usePageStore(selectSectionListItemByType("standOut"))
  const contactForm = usePageStore(
    selectSectionItemByName("sections.contact-form")
  )
  const gallerySection = usePageStore(
    selectSectionItemByName("sections.gallery-section")
  )

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
      <PageHeroRoutes
        page={routes.ABOUT}
        title={hero?.title}
        image={hero?.picture?.url && imageUrlBuilder(hero?.picture?.url)}
      />
      <SectionAboutHero
        onScrollToForm={callbacks.onScrollToForm}
        data={aboutHero}
      />
      <SectionAboutDescription data={aboutInfo} />
      <SectionStandOut data={standOut} />
      <SectionContactForm formRef={formRef} data={contactForm} />
      <SectionLicenses data={gallerySection} />
    </ContactFormProvider>
  )
}

export { Page }
