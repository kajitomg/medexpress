import { RowTextItem } from "@/shared/model/strapi/blocks/row-text-item"
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
  items?: RowTextItem[]
}

const ContentFaq = ({
  items,
  className,
}: ComponentProps<"div"> & ContentFaqProps) => {
  return (
    <div className={className}>
      <Accordion type="multiple" itemScope itemType="https://schema.org/QAPage">
        {items?.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.title || ""}
            className="rounded-4xl px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-3"
          >
            <AccordionTrigger
              className="cursor-pointer"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <Typography asChild variant="h4" itemProp="name">
                <h4>{item.title}</h4>
              </Typography>
            </AccordionTrigger>
            <AccordionContent
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <Typography variant="muted" itemProp="text">
                {item.content}
              </Typography>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export { ContentFaq }
