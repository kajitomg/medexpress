import { Button } from "@/shared/ui/button"
import {
  ContentSection,
  ContentSectionContent,
} from "@/shared/ui/content-section"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import * as React from "react"

const Contacts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-auto">
        <div className="relative flex flex-col justify-center items-center h-50">
          <h1 className="text-5xl text-center hover:scale-102 transition-transform duration-200 cursor-default">
            <strong>Контакты</strong>
          </h1>
          <div className="text-sm font-extralight mt-4">
            <span className="hover:underline cursor-pointer">Главная</span>
            <span>{"\n/\n"}</span>
            <span className="hover:underline cursor-pointer">Контакты</span>
            <span>{"\n"}</span>
          </div>
        </div>
        <ContentSection>
          <ContentSectionContent className="flex items-center gap-4 max-w-400 p-4">
            <div className="flex-1/2 grid grid-cols-2 gap-4 p-4">
              <div className="flex flex-col">
                <h6 className="font-bold text-lg">Адрес:</h6>
                <span className="text-gray-700 font-light">
                  357820 Ставропольский край город Георгиевск улица
                  Минераловодская ,8А
                </span>
              </div>
              <div className="flex flex-col">
                <h6 className="font-bold text-lg">Режим работы:</h6>
                <span className="text-gray-700 font-light">
                  С 8:30 до 17:30
                </span>
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
        <ContentSection>
          <ContentSectionContent className="flex flex-col gap-4 max-w-100 w-full p-4">
            <div className="h-15">
              <h4 className="font-bold text-lg">Заявка:</h4>
              <h6 className="font-light text-sm">
                Оставьте заявку, чтобы связаться с нами
              </h6>
            </div>
            <div className="mt-4 h-full flex flex-col justify-center gap-4">
              <Input type="phonenumber" placeholder="Введите номер телефона" />
              <Input type="email" placeholder="Введите email" />
              <Textarea
                placeholder="Напишите комментарий"
                className="text-sm placeholder:text-sm"
              />
              <div className="flex items-center">
                <Input type="checkbox" className="w-5 h-5 m-2" />
                <span className="text-xs font-light">
                  Согласие на обработку персональных данных
                </span>
              </div>
              <Button
                variant="ghost"
                className="cursor-pointer rounded-4xl text-gray-600  "
              >
                Оставить заявку
              </Button>
            </div>
          </ContentSectionContent>
        </ContentSection>
      </main>
    </div>
  )
}

export default Contacts
