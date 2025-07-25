import { sendContactFormMail } from "@/entities/mail/services/send-contact-form-mail"
import { ContactFormDetails } from "@/pages/main/ui/contact-form-details"
import { cn } from "@/shared/lib"
import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import { ContactForm } from "@/widgets/contact-form/ui/contact-form"
import Image from "next/image"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionContactFormProps {}

const SectionContactForm = ({
  className,
  ref,
}: ComponentProps<"section"> & SectionContactFormProps) => {
  const callbacks = {
    handleSubmit: async (data: ContactFormSchema) => {
      const type: "email" | "phonenumber" =
        (data?.email && "email") || (data?.phonenumber && "phonenumber")
      return await sendContactFormMail({
        type,
        ...data,
      })
    },
  }

  return (
    <ContentSection
      className={cn(
        "relative overflow-hidden bg-(--color-brand)/95",
        className
      )}
      ref={ref}
    >
      <ContentSectionContent className="h-full flex justify-center items-center gap-8">
        <ContactFormDetails />
        <ContactForm
          className="max-w-124 w-full"
          handleSubmit={callbacks.handleSubmit}
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
