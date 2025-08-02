import { ContentServices } from "@/pages/main/ui/content-services"
import { ContentSection, ContentSectionContent } from "@/shared/ui"
import * as React from "react"
import { ComponentProps } from "react"

const DATA = [
  {
    id: 1,
    title: "Каталог",
  },
  {
    id: 2,
    title: "Подборки",
  },
  {
    id: 3,
    title: "Конструктор кабинета",
  },
]

interface ServicesProps {
  onScrollToForm: () => void
}

const Services = ({
  className,
  onScrollToForm,
}: ComponentProps<"section"> & ServicesProps) => {
  return (
    <ContentSection className={className}>
      <ContentSectionContent>
        <ContentServices onScrollToForm={onScrollToForm} items={DATA} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { Services }
