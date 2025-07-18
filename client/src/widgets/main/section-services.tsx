import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { SectionServicesContent } from "@/widgets/main/section-services-content"
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
  {
    id: 4,
    title: "Заказать консультацию",
  },
]

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
        <SectionServicesContent onScrollToForm={onScrollToForm} items={DATA} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionServices }
