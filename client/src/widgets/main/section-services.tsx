import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { SectionServicesContent } from "@/widgets/main/section-services-content"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionServicesProps {
  onScrollToForm: () => void
}

const SectionServices = ({
  className,
  onScrollToForm,
}: ComponentProps<"section"> & SectionServicesProps) => {
  return (
    <ContentSection className={className}>
      <ContentSectionContent>
        <SectionServicesContent onScrollToForm={onScrollToForm} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionServices }
