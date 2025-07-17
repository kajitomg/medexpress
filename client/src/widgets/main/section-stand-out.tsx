import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
} from "@/shared/ui"
import { Title } from "@/shared/ui/title"
import { SectionServicesContent } from "@/widgets/main/section-stand-out-content"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionStandOutProps {}

const SectionStandOut = ({
  className,
}: ComponentProps<"section"> & SectionStandOutProps) => {
  return (
    <ContentSection className={className}>
      <ContentSectionHeader>
        <Title asChild className="hover-scale cursor-default">
          <h4>
            <strong>Почему стоит выбрать нас ?</strong>
          </h4>
        </Title>
      </ContentSectionHeader>
      <ContentSectionContent>
        <SectionServicesContent />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionStandOut }
