import {
  ContentSection,
  ContentSectionContent,
  ContentSectionTitle,
} from "@/shared/ui"
import { BookCheck, Headset, Lightbulb, ShieldCheck } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionStandOutProps {}

const SectionStandOut = ({}: ComponentProps<"section"> &
  SectionStandOutProps) => {
  return (
    <ContentSection>
      <ContentSectionTitle className="hover:scale-102 transition-transform duration-200 cursor-default">
        Почему стоит выбрать нас ?
      </ContentSectionTitle>
      <ContentSectionContent className="grid grid-cols-2 gap-4">
        <div className="grid items-center gap-4 content-start">
          <Headset width="24" height="24" />
          <h5 className="font-bold text-lg col-start-2">Поддержка клиентов</h5>
          <span className="text-gray-700 font-light col-start-2">
            Наша команда всегда готова помочь вам с любыми вопросами и запросами
            на информацию.
          </span>
        </div>

        <div className="grid items-center gap-4 content-start">
          <BookCheck width="24" height="24" />
          <h5 className="font-bold text-lg col-start-2">Гарантии</h5>
          <span className="text-gray-700 font-light col-start-2">
            Своевременные поставки по всей территории России, 100% соответствие
            ТЗ
          </span>
        </div>

        <div className="grid items-center gap-4 content-start">
          <Lightbulb width="24" height="24" />
          <h5 className="font-bold text-lg col-start-2">Инновации</h5>
          <span className="text-gray-700 font-light col-start-2">
            Регулярно обновляем наш ассортимент, чтобы предложить вам самые
            современные решения в области медицины
          </span>
        </div>

        <div className="grid items-center gap-4 content-start">
          <ShieldCheck width="24" height="24" />
          <h5 className="font-bold text-lg col-start-2">Качество продукции</h5>
          <span className="text-gray-700 font-light col-start-2">
            Мы предлагаем только высококачественное оборудование, которое прошло
            все необходимые проверки и сертификации
          </span>
        </div>
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionStandOut }
