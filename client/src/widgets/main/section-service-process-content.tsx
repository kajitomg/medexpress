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

const SectionServiceProcessContent = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-4">
        {DATA.map((item) => (
          <div className="grid grid-cols-1 justify-items-center" key={item.id}>
            <div className="relative rounded-full w-16 h-16 bg-white shadow-sm shadow-black">
              <item.icon className="absolute top-1/2 left-1/2 -translate-1/2 w-6 h-6" />
            </div>
            <div className="text-center mt-6">
              <h6 className="text-lg font-bold">{item.title}</h6>
              <span className="inline-block text-gray-700 font-light mt-6">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { SectionServiceProcessContent }
