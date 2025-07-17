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

const SectionServicesContent = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4">
        {DATA.map((item) => (
          <div key={item.id} className="grid items-center gap-4 content-start">
            <item.icon size="24" />
            <h5 className="font-bold text-lg col-start-2">{item.title}</h5>
            <span className="text-gray-700 font-light col-start-2">
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { SectionServicesContent }
