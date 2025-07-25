import { ContactFormDetails } from "@/pages/contacts/ui/contact-form-details"
import { cn } from "@/shared/lib"
import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { ContactForm } from "@/widgets/contact-form/ui/contact-form"
import Image from "next/image"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionContactFormProps {}

const SectionContactForm = ({
  className,
  ref,
}: ComponentProps<"section"> & SectionContactFormProps) => {
  return (
    <ContentSection
      className={cn(
        "relative overflow-hidden bg-(--color-brand)/95",
        className
      )}
      ref={ref}
    >
      <ContentSectionContent className="h-full flex justify-center items-center gap-8">
        <ContactForm className="w-280" />
        <ContactFormDetails />
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
