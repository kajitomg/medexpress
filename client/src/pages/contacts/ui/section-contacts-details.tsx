import { Button, ContentSection, ContentSectionContent } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionContactsDetailsProps {}

const SectionContactsDetails = ({ className }: ComponentProps<"section">) => {
  return (
    <ContentSection className={className}>
      <ContentSectionContent className="flex items-center flex-col lg:flex-row gap-4 w-full p-4">
        <div className="flex-1/2 grid grid-cols-2 gap-4 p-4">
          <div className="flex flex-col">
            <h6 className="text-base md:text-lg font-bold">Адрес:</h6>
            <span className="inline-block text-gray-700 font-light text-sm md:text-base mt-2">
              357820 Ставропольский край, г. Георгевск, ул. Минераловодская 8А
              <br />
            </span>
          </div>
          <div className="flex flex-col">
            <h6 className="text-base md:text-lg font-bold">Режим работы:</h6>
            <span className="inline-block text-gray-700 font-light text-sm md:text-base mt-2">
              С 8:30 до 17:30
              <br />
              Суббота, Воскресенье - Выходной
            </span>
          </div>
          <div className="flex flex-col">
            <h6 className="text-base md:text-lg font-bold">Тел/факс:</h6>
            <span className="inline-block text-gray-700 font-light text-sm md:text-base mt-2">
              (87951) 5-07-02
              <br />
              (87951) 5-11-16
            </span>
          </div>
          <div className="flex flex-col">
            <h6 className="text-base md:text-lg font-bold">E-mail:</h6>
            <span className="inline-block text-gray-700 font-light text-sm md:text-base mt-2">
              med-ekspress@yandex.ru
              <br />
              torg-medekspress@mail.ru
            </span>
          </div>
          <div className="flex flex-col">
            <h6 className="text-base md:text-lg font-bold">Соц.сети:</h6>
            <div className="mt-2">
              <Button
                variant="link"
                size="icon"
                className="cursor-pointer hover:text-(--color-brand)"
              >
                <Instagram className="size-5" />
              </Button>
              <Button
                variant="link"
                size="icon"
                className="cursor-pointer hover:text-(--color-brand)"
              >
                <Twitter className="size-5" />
              </Button>
              <Button
                variant="link"
                size="icon"
                className="cursor-pointer hover:text-(--color-brand)"
              >
                <Facebook className="size-5" />
              </Button>
              <Button
                variant="link"
                size="icon"
                className="cursor-pointer hover:text-(--color-brand)"
              >
                <Linkedin className="size-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1/2 w-full">
          <AspectRatio ratio={16 / 9} className="h-full">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeee8ace2d2d28e3ab2f55b2e0ebf4d05c73c3d341c2c18ca2f3bf32bab2b5f45&amp;source=constructor"
              width="500"
              height="400"
              className="w-full h-full"
            ></iframe>
          </AspectRatio>
        </div>
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionContactsDetails }
