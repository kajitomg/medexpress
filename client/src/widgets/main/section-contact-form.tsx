import { cn } from "@/shared/lib"
import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { SectionContactFormContactForms } from "@/widgets/main/section-contact-form-contact-forms"
import { SectionContactFormDetails } from "@/widgets/main/section-contact-form-details"
import Image from "next/image"
import * as React from "react"
import { ComponentProps } from "react"
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form"
import { FormSchema } from "../../../app/(public)/(main-layout)/(main)/page"

interface SectionContactFormProps {
  register: (
    name: keyof FormSchema,
    options?: RegisterOptions<FormSchema, keyof FormSchema>
  ) => UseFormRegisterReturn<keyof FormSchema>
  isDirty: boolean
  isSubmitting: boolean
  isValid: boolean
  mode: "e-mail" | "phonenumber"
  setMode: (mode: "e-mail" | "phonenumber") => void
}

const SectionContactForm = ({
  isDirty,
  isSubmitting,
  isValid,
  register,
  mode,
  setMode,
  className,
  ref,
}: ComponentProps<"section"> & SectionContactFormProps) => {
  return (
    <ContentSection
      className={cn(
        "relative overflow-hidden bg-(--color-brand)/95 py-20",
        className
      )}
      ref={ref}
    >
      <ContentSectionContent className="h-full flex justify-center items-center gap-8">
        <SectionContactFormDetails />
        <SectionContactFormContactForms
          className="w-280"
          register={register}
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          isValid={isValid}
          mode={mode}
          setMode={setMode}
        />
      </ContentSectionContent>
      <Image
        src="/oborud4.jpeg"
        alt="alt"
        width="8000"
        height="5784"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
    </ContentSection>
  )
}

export { SectionContactForm }
