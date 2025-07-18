"use client"

import { MainPageHero } from "@/widgets/main/main-page-hero"
import { SectionContactForm } from "@/widgets/main/section-contact-form"
import { SectionFaq } from "@/widgets/main/section-faq"
import { SectionServiceProcess } from "@/widgets/main/section-service-process"
import { SectionServices } from "@/widgets/main/section-services"
import { SectionStandOut } from "@/widgets/main/section-stand-out"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchemaEmail, formSchemaPhonenumber } from "./schema"

export type FormSchemaEmail = z.infer<typeof formSchemaEmail>
export type FormSchemaPhonenumber = z.infer<typeof formSchemaPhonenumber>

export type FormSchema = FormSchemaEmail | FormSchemaPhonenumber

const Home = () => {
  const [mode, setMode] = useState<"e-mail" | "phonenumber">("e-mail")

  const schema = mode === "e-mail" ? formSchemaEmail : formSchemaPhonenumber
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    getValues,
    formState: { isDirty, isSubmitting, errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })
  const formRef = useRef<HTMLFormElement>(null)

  const callbacks = {
    onScrollToForm: useCallback(() => {
      setMode("e-mail")
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, [formRef]),
  }
  return (
    <>
      <MainPageHero
        onScrollToForm={callbacks.onScrollToForm}
        setValue={setValue}
        setFocus={() => setFocus("firstname")}
      />
      <SectionStandOut />
      <SectionServices onScrollToForm={callbacks.onScrollToForm} />
      <SectionServiceProcess />
      <SectionContactForm
        ref={formRef}
        register={register}
        isDirty={isDirty}
        isSubmitting={isSubmitting}
        isValid={isValid}
        mode={mode}
        setMode={setMode}
      />
      <SectionFaq />
    </>
  )
}

export default Home
