import { ListSection } from "@/entities/_components/sections/list-section"
import { cn } from "@/shared/lib"
import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
  Typography,
} from "@/shared/ui"
import { ContentFaq } from "@/widgets/section-faq/ui/content-faq"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionFaqProps {
  data?: ListSection
}

const SectionFaq = ({
  className,
  data,
}: ComponentProps<"section"> & SectionFaqProps) => {
  return (
    <ContentSection className={cn(className)}>
      <ContentSectionHeader>
        <Typography asChild variant="h2">
          <h2 className="hover-scale text-center">
            <strong>{data?.title}</strong>
          </h2>
        </Typography>
      </ContentSectionHeader>
      <ContentSectionContent className="w-full">
        <ContentFaq items={data?.items} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionFaq }
