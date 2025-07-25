import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
} from "@/shared/ui"
import { Title } from "@/shared/ui/title"
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

interface StandOutProps {}

const SectionStandOut = ({
  className,
}: ComponentProps<"section"> & StandOutProps) => {
  return (
    <ContentSection className={className}>
      <ContentSectionHeader>
        <Title asChild className="hover-scale cursor-default">
          <h4>
            <strong>Почему стоит выбрать нас ?</strong>
          </h4>
        </Title>
      </ContentSectionHeader>
      <ContentSectionContent>
        <ContentStandOut items={DATA} />
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionStandOut }
