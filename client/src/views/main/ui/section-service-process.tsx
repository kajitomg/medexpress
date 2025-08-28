import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
  Typography,
} from "@/shared/ui"
import { ContentServiceProcess } from "@/widgets/section-service-process/ui/content-service-process"
import { MessagesSquare, Phone, SearchCheck, Truck } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

const DATA = [
  {
    id: 1,
    icon: Phone,
    title: "Первичный контакт",
    description: "Свяжитесь с нами через форму обратной связи или по телефону.",
  },
  {
    id: 2,
    icon: MessagesSquare,
    title: "Консультация",
    description: "Наши эксперты проконсультируют вас по всем вопросам.",
  },
  {
    id: 3,
    icon: SearchCheck,
    title: "Выбор оборудования",
    description: "Поможем вам выбрать необходимое медицинское оборудование.",
  },
  {
    id: 4,
    icon: Truck,
    title: "Поставка",
    description: "Организуем доставку на ваш склад или объект.",
  },
]

const SectionServiceProcess = ({ className }: ComponentProps<"section">) => {
  return (
    <ContentSection className={className}>
      <ContentSectionHeader>
        <Typography asChild variant="h2">
          <h2 className="hover-scale text-center">
            <strong>Процесс предоставления услуг</strong>
          </h2>
        </Typography>
      </ContentSectionHeader>
      <ContentSectionContent>
        <ContentServiceProcess items={DATA} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionServiceProcess }
