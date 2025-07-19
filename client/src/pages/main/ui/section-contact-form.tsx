import { ContactFormDetails } from "@/pages/main/ui/contact-form-details"
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
        "relative overflow-hidden bg-(--color-brand)/95 py-20",
        className
      )}
      ref={ref}
    >
      <ContentSectionContent className="h-full flex justify-center items-center gap-8">
        <ContactFormDetails />
        <ContactForm className="w-280" />
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
