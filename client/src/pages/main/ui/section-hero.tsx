"use client"

import { HeroForm } from "@/pages/main/ui/hero-form"
import {
  PageHero,
  PageHeroBackground,
  PageHeroContent,
} from "@/shared/ui/page-hero"
import {
  ContactFormMode,
  contactFormSchemaEmail,
  ContactFormSchemaEmail,
} from "@/widgets/contact-form/model"
import {
  useContactForm,
  useContactFormModeStore,
} from "@/widgets/contact-form/provider"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import * as React from "react"
import { ComponentProps, FormEventHandler } from "react"
import { useForm } from "react-hook-form"

interface HeroProps {
  onScrollToForm: () => void
}

const SectionHero = ({
  onScrollToForm,
}: ComponentProps<"section"> & HeroProps) => {
  const setMode = useContactFormModeStore((state) => state.setMode)
  const methods = useContactForm()
  const { register, reset, getValues } = useForm<
    Pick<ContactFormSchemaEmail, "email">
  >({
    resolver: zodResolver(contactFormSchemaEmail.pick({ email: true })),
  })

  const callbacks = {
    onSubmit: ((e) => {
      e.preventDefault()
      methods?.setValue("email", getValues("email"))
      onScrollToForm()
      reset()
      setMode(ContactFormMode.EMAIL)
      setTimeout(() => {
        methods?.setFocus("firstname", { shouldSelect: true })
      }, 800)
    }) as FormEventHandler<HTMLFormElement>,
  }

  return (
    <PageHero height="full">
      <PageHeroBackground>
        <Image
          src="/squared-background 3.png"
          alt="preview backgound"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
        <div className="absolute w-full h-1/4 bottom-0 from-transparent to-background bg-gradient-to-b" />
      </PageHeroBackground>
      <PageHeroContent>
        <div className="relative max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl top-2/5 left-1/2 -translate-1/2 flex flex-col items-center p-4 md:p-8">
          <h1 className="text-4xl font-black hover-scale text-center md:text-5xl lg:text-6xl">
            <strong>
              <span className="text-(--color-brand)">Medexpress</span> - ваш
              надежный партнер в мире медицинского оборудования
            </strong>
          </h1>
          <div className="max-w-140 mt-12 text-center">
            <span className="text-xl cursor-default md:text-2xl">
              <strong>Записаться на консультацию</strong>
            </span>
            <div className="mt-4">
              <HeroForm
                register={register("email")}
                onSubmit={callbacks.onSubmit}
              />
            </div>
          </div>
        </div>
      </PageHeroContent>
    </PageHero>
  )
}

export { SectionHero }
