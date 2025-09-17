"use client"

import { PageSections } from "@/entities/page/model/page"
import { createSectionsStore } from "@/features/sections/provider"
import {
  selectSectionItemByName,
  selectSectionListItemByType,
} from "@/features/sections/store"
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

const useSectionsStore = createSectionsStore<PageSections[]>()

const Page = () => {
  const aboutHero = useSectionsStore(
    selectSectionItemByName("elements.about-hero")
  )
  const aboutInfo = useSectionsStore(
    selectSectionItemByName("elements.about-info")
  )
  const hero = useSectionsStore(selectSectionItemByName("sections.hero"))
  const standOut = useSectionsStore(selectSectionListItemByType("standOut"))
  const contactForm = useSectionsStore(
    selectSectionItemByName("sections.contact-form")
  )
  const gallerySection = useSectionsStore(
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
