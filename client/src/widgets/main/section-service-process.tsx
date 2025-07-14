import {
  ContentSection,
  ContentSectionContent,
  ContentSectionTitle,
} from "@/shared/ui"
import { MessagesSquare, Phone, SearchCheck, Truck } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionServiceProcessProps {}

const SectionServiceProcess = ({}: ComponentProps<"section"> &
  SectionServiceProcessProps) => {
  return (
    <ContentSection>
      <ContentSectionTitle className="hover:scale-102 transition-transform duration-200 cursor-default">
        Процесс предоставления услуг
      </ContentSectionTitle>
      <ContentSectionContent className="grid grid-cols-4">
        <div className="grid grid-cols-1 justify-items-center">
          <div className="relative rounded-full w-16 h-16 bg-white shadow-sm shadow-black">
            <Phone className="absolute top-1/2 left-1/2 -translate-1/2 w-6 h-6" />
          </div>
          <div className="text-center mt-6">
            <h6 className="text-lg font-bold">Первичный контакт</h6>
            <span className="inline-block text-gray-700 font-light mt-6">
              Свяжитесь с нами через форму обратной связи или по телефону.
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center">
          <div className="relative rounded-full w-16 h-16 bg-white shadow-sm shadow-black">
            <MessagesSquare className="absolute top-1/2 left-1/2 -translate-1/2 w-6 h-6" />
          </div>
          <div className="text-center mt-6">
            <h6 className="text-lg font-bold">Консультация</h6>
            <span className="inline-block text-gray-700 font-light  mt-6">
              Наши эксперты проконсультируют вас по всем вопросам.
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center">
          <div className="relative rounded-full w-16 h-16 bg-white shadow-sm shadow-black">
            <SearchCheck className="absolute top-1/2 left-1/2 -translate-1/2 w-6 h-6" />
          </div>
          <div className="text-center mt-6">
            <h6 className="text-lg font-bold">Выбор оборудования</h6>
            <span className="inline-block text-gray-700 font-light  mt-6">
              Поможем вам выбрать необходимое медицинское оборудование.
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center">
          <div className="relative rounded-full w-16 h-16 bg-white shadow-sm shadow-black">
            <Truck className="absolute top-1/2 left-1/2 -translate-1/2 w-6 h-6" />
          </div>
          <div className="text-center mt-6">
            <h6 className="text-lg font-bold">Поставка</h6>
            <span className="inline-block text-gray-700 font-light  mt-6">
              Организуем доставку на ваш склад или объект.
            </span>
          </div>
        </div>
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionServiceProcess }
