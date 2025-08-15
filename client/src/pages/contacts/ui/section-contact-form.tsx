import { ContactFormDetails } from "@/pages/contacts/ui/contact-form-details"
import { cn } from "@/shared/lib"
import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import { sendContactForm } from "@/widgets/contact-form/services"
import { ContactForm } from "@/widgets/contact-form/ui/contact-form"
import Image from "next/image"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionContactFormProps {}

const SectionContactForm = ({
  className,
}: ComponentProps<"section"> & SectionContactFormProps) => {
  const handleSubmit = async (data: ContactFormSchema) => {
    return await sendContactForm(data)
  }
  return (
    <ContentSection
      className={cn(
        "relative overflow-hidden bg-(--color-brand)/95 h-auto xl:h-210",
        className
      )}
    >
      <ContentSectionContent className="h-auto flex justify-center items-center gap-8 flex-col-reverse xl:flex-row">
        <ContactForm className="max-w-124 w-full" handleSubmit={handleSubmit} />
        <ContactFormDetails />
      </ContentSectionContent>
      <Image
        src="/oborud4.jpeg"
        alt="alt"
        width="8000"
        height="5784"
        className="absolute top-0 left-0 w-full h-auto object-cover -z-10"
      />
    </ContentSection>
  )
}

export { SectionContactForm }
