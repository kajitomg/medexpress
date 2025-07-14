"use client"

import { MainPageHero } from "@/widgets/main/main-page-hero"
import { SectionContactForm } from "@/widgets/main/section-contact-form"
import { SectionFaq } from "@/widgets/main/section-faq"
import { SectionServiceProcess } from "@/widgets/main/section-service-process"
import { SectionServices } from "@/widgets/main/section-services"
import { SectionStandOut } from "@/widgets/main/section-stand-out"
import * as React from "react"
import { useCallback, useRef, useState } from "react"

export type HomeFormDataType = {
  email?: string
  phonenumber?: string
  message?: string
}

const Home = () => {
  const [formData, setFormData] = useState<HomeFormDataType>({})
  const formRef = useRef<HTMLFormElement>(null)

  const callbacks = {
    onScrollToForm: useCallback(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, [formRef]),
    onFormChange: useCallback(
      (field: keyof HomeFormDataType) => (value: string) => {
        setFormData({
          ...formData,
          [field]: value,
        })
      },
      [formData]
    ),
  }

  return (
    <>
      <MainPageHero
        onScrollToForm={callbacks.onScrollToForm}
        onEmailChange={callbacks.onFormChange("email")}
      />
      <SectionStandOut />
      <SectionServices onScrollToForm={callbacks.onScrollToForm} />
      <SectionServiceProcess />
      <SectionContactForm
        ref={formRef}
        formData={formData}
        onFormChange={callbacks.onFormChange}
      />
      <SectionFaq />
    </>
  )
}

export default Home
