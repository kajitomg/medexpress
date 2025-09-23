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
import { QAPage, WithContext } from "schema-dts"

interface ContentFaqProps {
  items?: RowTextItem[]
}

const qaPage = (items?: RowTextItem[]): WithContext<QAPage> => {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: items?.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content,
      },
    })),
  }
}

const ContentFaq = ({
  items,
  className,
}: ComponentProps<"div"> & ContentFaqProps) => {
  return (
    <div className={className}>
      <Accordion type="multiple">
        <script
          id="FAQ"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(qaPage(items)),
          }}
        />
        {items?.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.title || ""}
            className="rounded-4xl px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-3"
          >
            <AccordionTrigger className="cursor-pointer">
              <Typography asChild variant="h4" itemProp="name">
                <h4>{item.title}</h4>
              </Typography>
            </AccordionTrigger>
            <AccordionContent>
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
