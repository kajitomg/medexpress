import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui"
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
      "Срок доставки зависит от типа оборудования, но мы стараемся\n" +
      "            организовать быструю доставку.",
  },
  {
    id: 3,
    value: "item-3",
    question: "Могу ли я получить консультацию перед заказом?",
    answer:
      "Конечно! Мы рекомендуем провести консультацию для выбора наилучшего оборудования для ваших нужд.",
  },
]

const SectionFaqContent = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={className}>
      <Accordion type="multiple">
        {DATA.map((item) => (
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

export { SectionFaqContent }
