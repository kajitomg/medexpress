import { MainPageServices as ServicesElement } from "@/entities/_components/elements/main-page-services"
import { routes } from "@/shared/config/routes"
import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { ContentServices } from "@/views/main/ui/content-services"
import * as React from "react"
import { ComponentProps } from "react"

export type ServicesItemData = {
  id: number
  title: string
  path: string
}

const PAGES: ServicesItemData[] = [
  {
    id: 1,
    title: routes.CATALOG().title,
    path: routes.CATALOG().path,
  },
  {
    id: 2,
    title: routes.NOMENCLATURE().title,
    path: routes.NOMENCLATURE().path,
  },
  {
    id: 3,
    title: routes.CONTACTS.title,
    path: routes.CONTACTS.path,
  },
  {
    id: 4,
    title: routes.ABOUT.title,
    path: routes.ABOUT.path,
  },
]

interface ServicesProps {
  onScrollToForm: () => void
  data?: ServicesElement
}

const Services = ({
  className,
  onScrollToForm,
  data,
}: ComponentProps<"section"> & ServicesProps) => {
  return (
    <ContentSection className={className}>
      <ContentSectionContent className="w-full">
        <ContentServices
          onScrollToForm={onScrollToForm}
          items={PAGES}
          data={data}
        />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { Services }
