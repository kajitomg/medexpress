import { Button } from "@/shared/ui"
import Image from "next/image"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionServicesContentProps {
  onScrollToForm: () => void
  items: {
    id: number
    title: string
  }[]
}

const SectionServicesContent = ({
  className,
  items,
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
          {items.map((item) => (
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
