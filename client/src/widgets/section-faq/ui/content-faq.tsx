import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Typography,
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
            <AccordionTrigger className="cursor-pointer">
              <Typography asChild variant="h4">
                <h4>{item.question}</h4>
              </Typography>
            </AccordionTrigger>
            <AccordionContent>
              <Typography variant="muted">{item.answer}</Typography>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export { ContentFaq }
