import { Button, ContentSection, ContentSectionContent } from "@/shared/ui"
import Image from "next/image"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionServicesProps {
  onScrollToForm: () => void
}

const SectionServices = ({
  onScrollToForm,
}: ComponentProps<"section"> & SectionServicesProps) => {
  return (
    <ContentSection>
      <ContentSectionContent className="flex max-h-150 bg-accent rounded-[50px] overflow-hidden">
        <div className="h-full">
          <Image
            src="/oborud4.jpeg"
            alt="alt"
            width="8000"
            height="5784"
            className="h-full w-auto object-cover"
          />
        </div>
        <ul className="p-10 text-nowrap text-left">
          <li>
            <Button
              variant="link"
              className="cursor-pointer hover:no-underline hover:text-(--color-brand) text-lg font-bold"
            >
              Каталог
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="cursor-pointer hover:no-underline  hover:text-(--color-brand) text-lg font-bold"
            >
              Услуги
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="cursor-pointer hover:no-underline hover:text-(--color-brand) text-lg font-bold"
            >
              Подборки
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="cursor-pointer hover:no-underline hover:text-(--color-brand) text-lg font-bold"
            >
              Конструктор кабинета
            </Button>
          </li>
          <li className="mt-2">
            <Button
              size="xl"
              variant="brand"
              className="cursor-pointer rounded-full"
              onClick={onScrollToForm}
            >
              Заказать консультацию
            </Button>
          </li>
        </ul>
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionServices }
