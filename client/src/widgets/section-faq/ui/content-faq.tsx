import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui"
import * as React from "react"
import { ComponentProps } from "react"

interface ContentFaqProps {
  items: {
    id: number
    value: string
    question: string
    answer: string
  }[]
}

const ContentFaq = ({
  items,
  className,
}: ComponentProps<"div"> & ContentFaqProps) => {
  return (
    <div className={className}>
      <Accordion type="multiple">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.value}
            className="rounded-4xl px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-3"
          >
            <AccordionTrigger className="text-base md:text-lg font-bold hover:no-underline cursor-pointer">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-gray-400 md:mt-2">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export { ContentFaq }
