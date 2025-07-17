import { Button } from "@/shared/ui"
import Image from "next/image"
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

interface SectionServicesContentProps {
  onScrollToForm: () => void
}

const SectionServicesContent = ({
  className,
  onScrollToForm,
}: ComponentProps<"div"> & SectionServicesContentProps) => {
  return (
    <div className={className}>
      <div className="bg-accent rounded-[50px] flex overflow-hidden">
        <div className="h-full">
          <Image
            src="/oborud4.jpeg"
            alt="alt"
            width="8000"
            height="5784"
            className="h-full h-full object-cover"
          />
        </div>
        <ul className="p-10 text-nowrap text-left flex flex-col items-start">
          {DATA.map((item) => (
            <Button
              key={item.id}
              asChild
              variant="link"
              className="cursor-pointer hover:no-underline hover:text-(--color-brand) text-lg font-bold"
            >
              <li>{item.title}</li>
            </Button>
          ))}

          <Button
            size="xl"
            variant="brand"
            className="cursor-pointer rounded-full mt-2"
            onClick={onScrollToForm}
          >
            <li>Заказать консультацию</li>
          </Button>
        </ul>
      </div>
    </div>
  )
}

export { SectionServicesContent }
