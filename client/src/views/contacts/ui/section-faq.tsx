import { cn } from "@/shared/lib"
import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
} from "@/shared/ui"
import { ContentFaq } from "@/widgets/section-faq/ui/content-faq"
import * as React from "react"
import { ComponentProps } from "react"

const DATA = [
  {
    id: 1,
    value: "item-1",
    question: "Как я могу заказать медицинское оборудование?",
    answer: "Организуем доставку на ваш склад или объект.",
  },
  {
    id: 2,
    value: "item-2",
    question: "Как долго длится доставка оборудования?",
    answer:
      "Срок доставки зависит от типа оборудования, но мы стараемся организовать быструю доставку.",
  },
  {
    id: 3,
    value: "item-3",
    question: "Могу ли я получить консультацию перед заказом?",
    answer:
      "Конечно! Мы рекомендуем провести консультацию для выбора наилучшего оборудования для ваших нужд.",
  },
]

const SectionFaq = ({ className }: ComponentProps<"section">) => {
  return (
    <ContentSection className={cn(className)}>
      <ContentSectionHeader>
        <h4 className="hover-scale text-center font-bold text-2xl sm:text-4xl md:text-5xl">
          <strong>Вопросы и ответы</strong>
        </h4>
      </ContentSectionHeader>
      <ContentSectionContent className="w-full">
        <ContentFaq items={DATA} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionFaq }
