import { ListSection } from "@/entities/_components/sections/list-section"
import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
  Typography,
} from "@/shared/ui"
import { ContentServiceProcess } from "@/widgets/section-service-process/ui/content-service-process"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionServiceProcessProps {
  data?: ListSection
}

const SectionServiceProcess = ({
  className,
  data,
}: ComponentProps<"section"> & SectionServiceProcessProps) => {
  return (
    <ContentSection className={className}>
      <ContentSectionHeader>
        <Typography asChild variant="h2">
          <h2 className="hover-scale text-center">
            <strong>Процесс предоставления услуг</strong>
          </h2>
        </Typography>
      </ContentSectionHeader>
      <ContentSectionContent>
        <ContentServiceProcess items={data?.items} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionServiceProcess }
