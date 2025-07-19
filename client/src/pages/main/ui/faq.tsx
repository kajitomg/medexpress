import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
} from "@/shared/ui"
import { Title } from "@/shared/ui/title"
import { SectionFaqContent } from "@/widgets/section-faq/ui/section-faq-content"
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

const Faq = ({ className }: ComponentProps<"section">) => {
  return (
    <ContentSection className={className}>
      <ContentSectionHeader>
        <Title asChild className="hover-scale cursor-default">
          <h4>
            <strong>Вопросы и ответы</strong>
          </h4>
        </Title>
      </ContentSectionHeader>
      <ContentSectionContent className="w-full">
        <SectionFaqContent items={DATA} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { Faq }
