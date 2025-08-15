import { cn } from "@/shared/lib"
import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
  Typography,
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
        <Typography asChild variant="h2">
          <h2 className="hover-scale text-center">
            <strong>Вопросы и ответы</strong>
          </h2>
        </Typography>
      </ContentSectionHeader>
      <ContentSectionContent className="w-full">
        <ContentFaq items={DATA} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionFaq }
