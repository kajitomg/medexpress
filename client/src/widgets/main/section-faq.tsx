import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
} from "@/shared/ui"
import { Title } from "@/shared/ui/title"
import { SectionFaqContent } from "@/widgets/main/section-faq-content"
import * as React from "react"
import { ComponentProps } from "react"

const SectionFaq = ({ className }: ComponentProps<"section">) => {
  return (
    <ContentSection className={className}>
      <ContentSectionHeader>
        <Title asChild className="hover-scale cursor-default">
          <h4>
            <strong>Вопросы и ответы</strong>
          </h4>
        </Title>
      </ContentSectionHeader>
      <ContentSectionContent className="w-full">
        <SectionFaqContent />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionFaq }
