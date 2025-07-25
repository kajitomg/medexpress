import { Button, ContentSection, ContentSectionContent } from "@/shared/ui"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionContactsDetailsProps {}

const SectionContactsDetails = ({ className }: ComponentProps<"section">) => {
  return (
    <ContentSection className={className}>
      <ContentSectionContent className="flex items-center gap-4 max-w-400 p-4">
        <div className="flex-1/2 grid grid-cols-2 gap-4 p-4">
          <div className="flex flex-col">
            <h6 className="font-bold text-lg">Адрес:</h6>
            <span className="text-gray-700 font-light">
              357820 Ставропольский край город Георгиевск улица Минераловодская
              ,8А
            </span>
          </div>
          <div className="flex flex-col">
            <h6 className="font-bold text-lg">Режим работы:</h6>
            <span className="text-gray-700 font-light">С 8:30 до 17:30</span>
            <span className="text-gray-700 font-light">
              Суббота, Воскресенье - Выходной
            </span>
          </div>
          <div className="flex flex-col">
            <h6 className="font-bold text-lg">Тел/факс:</h6>
            <span className="text-gray-700 font-light">
              (87951) 5-07-02, 5-11-16
            </span>
          </div>
          <div className="flex flex-col">
            <h6 className="font-bold text-lg">E-mail:</h6>
            <span className="text-gray-700 font-light">
              med-ekspress@yandex.ru
            </span>
            <span className="text-gray-700 font-light">
              torg-medekspress@mail.ru
            </span>
          </div>
          <div className="flex flex-col">
            <h6 className="font-bold text-lg">Соц.сети:</h6>
            <div>
              <Button
                variant="link"
                size="icon"
                className="cursor-pointer text-gray-700"
              >
                <Instagram className="size-6" />
              </Button>
              <Button
                variant="link"
                size="icon"
                className="cursor-pointer text-gray-700"
              >
                <Twitter className="size-6" />
              </Button>
              <Button
                variant="link"
                size="icon"
                className="cursor-pointer text-gray-700"
              >
                <Facebook className="size-6" />
              </Button>
              <Button
                variant="link"
                size="icon"
                className="cursor-pointer text-gray-700"
              >
                <Linkedin className="size-6" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1/2">
          <Image
            alt="Карта"
            src="/map.jpg"
            width="1000"
            height="1000"
            className="w-full h-full object-cover"
          ></Image>
        </div>
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionContactsDetails }
