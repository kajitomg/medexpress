import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
} from "@/shared/ui"
import { Title } from "@/shared/ui/title"
import { SectionServiceProcessContent } from "@/widgets/main/section-service-process-content"
import * as React from "react"
import { ComponentProps } from "react"

const SectionServiceProcess = ({ className }: ComponentProps<"section">) => {
  return (
    <ContentSection className={className}>
      <ContentSectionHeader>
        <Title asChild className="hover-scale cursor-default">
          <h4>
            <strong>Процесс предоставления услуг</strong>
          </h4>
        </Title>
      </ContentSectionHeader>
      <ContentSectionContent>
        <SectionServiceProcessContent />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionServiceProcess }
