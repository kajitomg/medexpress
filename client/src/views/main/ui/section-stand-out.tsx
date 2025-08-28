import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
  Typography,
} from "@/shared/ui"
import { ContentStandOut } from "@/widgets/section-stand-out/ui/content-stand-out"
import { BookCheck, Headset, Lightbulb, ShieldCheck } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

const DATA = [
  {
    id: 1,
    icon: Headset,
    title: "Поддержка клиентов",
    description:
      "Наша команда всегда готова помочь вам с любыми вопросами и запросами на информацию.",
  },
  {
    id: 2,
    icon: BookCheck,
    title: "Гарантии",
    description:
      "Своевременные поставки по всей территории России, 100% соответствие ТЗ.",
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Инновации",
    description:
      "Регулярно обновляем наш ассортимент, чтобы предложить вам самые современные решения в области медицины.",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Качество продукции",
    description:
      "Мы предлагаем только высококачественное оборудование, которое прошло все необходимые проверки и сертификации.",
  },
]

const SectionStandOut = ({ className }: ComponentProps<"section">) => {
  return (
    <ContentSection className={className}>
      <ContentSectionHeader>
        <Typography asChild variant="h2">
          <h2 className="hover-scale text-center">
            <strong>Почему выбирают нас ?</strong>
          </h2>
        </Typography>
      </ContentSectionHeader>
      <ContentSectionContent>
        <ContentStandOut items={DATA} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionStandOut }
