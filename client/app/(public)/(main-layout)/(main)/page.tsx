"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion"
import { Button } from "@/shared/ui/button"
import {
  ContentSection,
  ContentSectionContent,
  ContentSectionTitle,
} from "@/shared/ui/content-section"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import {
  BookCheck,
  Headset,
  Lightbulb,
  MessagesSquare,
  Phone,
  SearchCheck,
  ShieldCheck,
  Truck,
} from "lucide-react"
import Image from "next/image"
import * as React from "react"
import { useRef } from "react"

const Home = () => {
  const formBlockEl = useRef<HTMLFormElement>(null)

  return (
    <>
      <section className="relative h-screen">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/squared-background 3.png"
            alt="preview backgound"
            width="1920"
            height="1080"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-[80px_0_0_0] w-full h-[100%-80px]">
          <div className="relative top-2/5 left-1/2 -translate-1/2 text-center max-w-190 flex flex-col items-center">
            <h1 className="text-5xl hover:scale-102 transition-transform duration-200 cursor-default">
              <strong>
                <span className="font-black">Medexpress</span> - ваш надежный
                партнер в мире медицинского оборудования
              </strong>
            </h1>
            <div className="max-w-140 mt-4">
              <span className="inline-block text-gray-700 font-light hover:scale-102 transition-transform duration-200 cursor-default">
                Мы предлагаем широкий выбор медицинского оборудования, чтобы
                удовлетворить потребности медицинских учреждений и
                профессионалов. Свяжитесь с нами для получения дополнительной
                информации.
              </span>
              <span className="block text-2xl mt-8  cursor-default">
                <strong>Записаться на консультацию</strong>
              </span>
              <div className="flex gap-4 mt-4">
                <Input
                  type="email"
                  variant="brand"
                  mysize="lg"
                  placeholder="Введите email"
                  className="rounded-4xl"
                />
                <Button
                  size="xl"
                  variant="brand"
                  className="cursor-pointer rounded-4xl"
                  onClick={() =>
                    formBlockEl?.current?.scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    })
                  }
                >
                  Оставить заявку
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-1/4 from-transparent to-white bg-gradient-to-b "></div>
      </section>
      <ContentSection>
        <ContentSectionTitle className="hover:scale-102 transition-transform duration-200 cursor-default">
          Почему стоит выбрать нас ?
        </ContentSectionTitle>
        <ContentSectionContent className="grid grid-cols-2 gap-4">
          <div className="grid items-center gap-4 content-start">
            <Headset width="24" height="24" />
            <h5 className="font-bold text-lg col-start-2">
              Поддержка клиентов
            </h5>
            <span className="text-gray-700 font-light col-start-2">
              Наша команда всегда готова помочь вам с любыми вопросами и
              запросами на информацию.
            </span>
          </div>

          <div className="grid items-center gap-4 content-start">
            <BookCheck width="24" height="24" />
            <h5 className="font-bold text-lg col-start-2">Гарантии</h5>
            <span className="text-gray-700 font-light col-start-2">
              Своевременные поставки по всей территории России, 100%
              соответствие ТЗ
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
            <h5 className="font-bold text-lg col-start-2">
              Качество продукции
            </h5>
            <span className="text-gray-700 font-light col-start-2">
              Мы предлагаем только высококачественное оборудование, которое
              прошло все необходимые проверки и сертификации
            </span>
          </div>
        </ContentSectionContent>
        <ContentSectionContent className="flex max-h-150 bg-accent rounded-[50px] overflow-hidden">
          <div className="h-full">
            <Image
              src="/oborud4.jpeg"
              alt="alt"
              width="8000"
              height="5784"
              className="h-full w-auto object-cover"
            />
          </div>
          <ul className="p-10 text-nowrap text-left">
            <li>
              <Button
                variant="link"
                className="cursor-pointer hover:no-underline hover:text-(--color-brand) text-lg font-bold"
              >
                Каталог
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="cursor-pointer hover:no-underline  hover:text-(--color-brand) text-lg font-bold"
              >
                Услуги
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="cursor-pointer hover:no-underline hover:text-(--color-brand) text-lg font-bold"
              >
                Подборки
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="cursor-pointer hover:no-underline hover:text-(--color-brand) text-lg font-bold"
              >
                Конструктор кабинета
              </Button>
            </li>
            <li className="mt-2">
              <Button
                size="xl"
                variant="brand"
                className="cursor-pointer rounded-full"
                onClick={() =>
                  formBlockEl?.current?.scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  })
                }
              >
                Заказать консультацию
              </Button>
            </li>
          </ul>
        </ContentSectionContent>
      </ContentSection>
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
      <ContentSection
        className="bg-(--color-brand)/95 rounded-[50px] min-h-200 mx-2 justify-center relative overflow-hidden"
        ref={formBlockEl}
      >
        <ContentSectionTitle className="max-w-190 text-center text-white hover:scale-102 transition-transform duration-200 cursor-default">
          <span className="font-black">Medexpress</span> - ваш надежный партнер
          в мире медицинского оборудования
        </ContentSectionTitle>
        <ContentSectionContent className="mt-12 w-full max-w-130">
          <form className="flex flex-col gap-2 text-center">
            <Input
              type="email"
              variant="brandBackgrounded"
              mysize="lg"
              placeholder="Введите email"
              className="rounded-4xl"
            />
            <Textarea
              placeholder="Напишите комментарий"
              variant="brandBackgrounded"
              size="lg"
              className="rounded-4xl"
            />
            <div className="flex items-center">
              <Input type="checkbox" className="w-5 h-5 m-2" />
              <span className="text-xs font-light text-white">
                Согласие на обработку персональных данных
              </span>
            </div>
            <Button
              size="xl"
              variant="ghost"
              className="cursor-pointer rounded-4xl text-white hover:bg-black/20 hover:text-white"
            >
              Оставить заявку
            </Button>
          </form>
        </ContentSectionContent>
        <div className="absolute w-full h-full top-0 left-0 -z-10">
          <Image
            src="/oborud4.jpeg"
            alt="alt"
            width="8000"
            height="5784"
            className="w-full h-full object-cover"
          />
        </div>
      </ContentSection>
      <ContentSection>
        <ContentSectionTitle className="hover:scale-102 transition-transform duration-200 cursor-default">
          Вопросы и ответы
        </ContentSectionTitle>
        <ContentSectionContent className="w-full">
          <Accordion type="multiple">
            <AccordionItem
              value="item-1"
              variant="brand"
              className="rounded-4xl"
            >
              <AccordionTrigger className="text-lg font-bold hover:no-underline">
                Как я могу заказать медицинское оборудование?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-400 mt-2">
                Организуем доставку на ваш склад или объект.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              variant="brand"
              className="rounded-4xl"
            >
              <AccordionTrigger className="text-lg font-bold hover:no-underline">
                Как долго длится доставка оборудования?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-400 mt-2">
                Срок доставки зависит от типа оборудования, но мы стараемся
                организовать быструю доставку.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              variant="brand"
              className="rounded-4xl"
            >
              <AccordionTrigger className="text-lg font-bold hover:no-underline">
                Могу ли я получить консультацию перед заказом?
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-400 mt-2">
                Конечно! Мы рекомендуем провести консультацию для выбора
                наилучшего оборудования для ваших нужд.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export default Home
