import { ListSectionComponent } from "@/entities/_components"
import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
  Typography,
} from "@/shared/ui"
import { ContentStandOut } from "@/widgets/section-stand-out/ui/content-stand-out"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionStandOutProps {
  data?: ListSectionComponent
}

const SectionStandOut = ({
  className,
  data,
}: ComponentProps<"section"> & SectionStandOutProps) => {
  return (
    <ContentSection className={className}>
      <ContentSectionHeader>
        <Typography asChild variant="h2">
          <h2 className="hover-scale text-center">
            <strong>{data?.title}</strong>
          </h2>
        </Typography>
      </ContentSectionHeader>
      <ContentSectionContent>
        <ContentStandOut items={data?.items} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionStandOut }
