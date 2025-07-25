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
            variant="brand"
            className="rounded-4xl"
          >
            <AccordionTrigger className="text-lg font-bold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-400 mt-2">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export { ContentFaq }
