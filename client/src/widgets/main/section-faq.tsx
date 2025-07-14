import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ContentSection,
  ContentSectionContent,
  ContentSectionTitle,
} from "@/shared/ui"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionFaqProps {}

const SectionFaq = ({}: ComponentProps<"section"> & SectionFaqProps) => {
  return (
    <ContentSection>
      <ContentSectionTitle className="hover:scale-102 transition-transform duration-200 cursor-default">
        Вопросы и ответы
      </ContentSectionTitle>
      <ContentSectionContent className="w-full">
        <Accordion type="multiple">
          <AccordionItem value="item-1" variant="brand" className="rounded-4xl">
            <AccordionTrigger className="text-lg font-bold hover:no-underline">
              Как я могу заказать медицинское оборудование?
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-400 mt-2">
              Организуем доставку на ваш склад или объект.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" variant="brand" className="rounded-4xl">
            <AccordionTrigger className="text-lg font-bold hover:no-underline">
              Как долго длится доставка оборудования?
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-400 mt-2">
              Срок доставки зависит от типа оборудования, но мы стараемся
              организовать быструю доставку.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" variant="brand" className="rounded-4xl">
            <AccordionTrigger className="text-lg font-bold hover:no-underline">
              Могу ли я получить консультацию перед заказом?
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-400 mt-2">
              Конечно! Мы рекомендуем провести консультацию для выбора
              наилучшего оборудования для ваших нужд.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionFaq }
