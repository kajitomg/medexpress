import { cn } from "@/shared/lib"
import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { ContactFormDetails } from "@/views/main/ui/contact-form-details"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import { sendContactForm } from "@/widgets/contact-form/services"
import { ContactForm } from "@/widgets/contact-form/ui"

import Image from "next/image"
import * as React from "react"
import { ComponentProps, RefObject } from "react"

interface SectionContactFormProps {
  formRef: RefObject<HTMLDivElement | null>
}

const SectionContactForm = ({
  className,
  formRef,
}: ComponentProps<"section"> & SectionContactFormProps) => {
  const handleSubmit = async (data: ContactFormSchema) => {
    return sendContactForm(data)
  }

  return (
    <ContentSection
      className={cn(
        "relative overflow-hidden bg-(--color-brand)/95 h-auto xl:h-210",
        className
      )}
    >
      <ContentSectionContent className="h-auto flex justify-center items-center gap-8 flex-col xl:flex-row">
        <ContactFormDetails />
        <ContactForm
          className="max-w-124 w-full"
          handleSubmit={handleSubmit}
          ref={formRef}
        />
      </ContentSectionContent>
      <Image
        src="/oborud4.jpeg"
        alt="alt"
        width="1000"
        height="800"
        className="absolute top-0 left-0 w-full h-auto object-cover -z-10"
      />
    </ContentSection>
  )
}

export { SectionContactForm }
