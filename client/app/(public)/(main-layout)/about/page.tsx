"use client"

import {
  Button,
  ContentSection,
  ContentSectionContent,
  ContentSectionTitle,
} from "@/shared/ui"
import {
  BadgeRussianRuble,
  BookCheck,
  Headset,
  Lightbulb,
  ShieldCheck,
} from "lucide-react"
import Image from "next/image"
import * as React from "react"

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-auto flex flex-col items-center">
        <div className="relative flex flex-col justify-center items-center h-50">
          <h1 className="text-5xl text-center hover:scale-102 transition-transform duration-200 cursor-default">
            <strong>О нас</strong>
          </h1>
          <div className="text-sm font-extralight mt-4">
            <span className="hover:underline cursor-pointer">Главная</span>
            <span>{"\n/\n"}</span>
            <span className="hover:underline cursor-pointer">О нас</span>
            <span>{"\n"}</span>
          </div>
        </div>
        <div>
          <ContentSection>
            <ContentSectionContent className="flex flex-col items-center max-w-400">
              <div className="mt-4 flex gap-12">
                <div className="min-h-150 flex-1/2 p-4">
                  <Image
                    alt="Коллектив"
                    src="/kollektiv.jpg"
                    width="1000"
                    height="1000"
                    className="w-auto h-full object-cover"
                  ></Image>
                </div>
                <div className="flex-1/2 p-4 my-12">
                  <h6 className="text-xl font-light">
                    <strong>О нас</strong>
                  </h6>
                  <h4 className="font-bold text-4xl mt-2">
                    <span>
                      Medexpress: Ваш надежный партнер в обеспечении доступности
                      передовых медицинских технологий.
                    </span>
                  </h4>
                  <span className="inline-block mt-8 text-gray-700 font-light">
                    Мы обеспечиваем быструю и бесперебойную доставку передовых
                    технологий, чтобы врачи могли своевременно оказывать помощь
                    и спасать жизни. Наша миссия – сделать современные
                    медицинские решения доступными для каждого учреждения.
                  </span>
                  <Button
                    variant="brand"
                    className="cursor-pointer rounded-4xl mt-4"
                  >
                    Связаться с нами
                  </Button>
                </div>
              </div>
            </ContentSectionContent>
          </ContentSection>
          <ContentSection>
            <ContentSectionContent className="flex items-center p-4 max-w-400">
              <div className="w-300 text-center">
                <h6 className="font-bold text-5xl">О нас</h6>
              </div>
              <div className="flex flex-col items-center justify-center max-w-250">
                <span className="text-gray-700 font-light">
                  Наша компания осуществляет продажу медицинской техники и
                  расходных материалов на территории Южного Федерального Округа
                  и других регионов Российской Федерации. Компания ООО
                  «Medexpress» успешно работает в области оснащения медицинских
                  учреждений (государственного и частного сектора) на протяжении
                  10 лет, и за это время были успешно выполнены более 1000
                  контрактов на поставку медицинского оборудования в более чем
                  100 городов Российской Федерации.
                </span>
                <span className="mt-8 text-gray-700 font-light">
                  В «Medexpress» мы верим, что доступ к современному
                  медицинскому оборудованию – это залог эффективной диагностики,
                  качественного лечения и, в конечном итоге, здоровья нации.
                  Наша компания специализируется на поставках широкого спектра
                  высококачественного медицинского оборудования для лечебных
                  учреждений всех типов – от небольших частных клиник до крупных
                  государственных больниц.
                </span>
              </div>
            </ContentSectionContent>
          </ContentSection>
          <ContentSection>
            <ContentSectionContent className="flex items-center p-4 max-w-400">
              <div className="flex flex-col items-centermax-w-250">
                <span className="text-gray-700 font-light">
                  Мы стремимся быть больше, чем просто поставщиком. Наша миссия
                  – создать надежную логистическую экосистему, которая соединяет
                  передовых производителей медицинского оборудования с
                  медицинскими учреждениями по всей стране. Мы хотим, чтобы
                  врачи имели возможность использовать лучшие инструменты для
                  своей работы, а пациенты получали своевременную и
                  квалифицированную помощь.
                </span>
              </div>
              <div className="w-300 text-center">
                <h6 className="font-bold text-5xl">Наша миссия</h6>
              </div>
            </ContentSectionContent>
          </ContentSection>
          <ContentSection>
            <ContentSectionTitle className="hover:scale-102 transition-transform duration-200 cursor-default">
              Почему выбирают нас?
            </ContentSectionTitle>
            <ContentSectionContent className="grid grid-cols-2 gap-4">
              <div className="grid items-center gap-4 content-start justify-start">
                <Headset width="24" height="24" />
                <h5 className="font-bold text-lg col-start-2">
                  Поддержка клиентов
                </h5>
                <span className="text-gray-700 font-light col-start-2">
                  Наша команда всегда готова помочь вам с любыми вопросами и
                  запросами на информацию.
                </span>
              </div>

              <div className="grid items-center gap-4 content-start justify-start">
                <BookCheck width="24" height="24" />
                <h5 className="font-bold text-lg col-start-2">Гарантии</h5>
                <span className="text-gray-700 font-light col-start-2">
                  Своевременные поставки по всей территории России, 100%
                  соответствие ТЗ
                </span>
              </div>

              <div className="grid items-center gap-4 content-start justify-start">
                <Lightbulb width="24" height="24" />
                <h5 className="font-bold text-lg col-start-2">Инновации</h5>
                <span className="text-gray-700 font-light col-start-2">
                  Регулярно обновляем наш ассортимент, чтобы предложить вам
                  самые современные решения в области медицины
                </span>
              </div>

              <div className="grid items-center gap-4 content-start justify-start">
                <ShieldCheck width="24" height="24" />
                <h5 className="font-bold text-lg col-start-2">
                  Качество продукции
                </h5>
                <span className="text-gray-700 font-light col-start-2">
                  Мы предлагаем только высококачественное оборудование, которое
                  прошло все необходимые проверки и сертификации
                </span>
              </div>

              <div className="grid items-center gap-4 content-start justify-start">
                <BadgeRussianRuble width="24" height="24" />
                <h5 className="font-bold text-lg col-start-2">Скидки</h5>
                <span className="text-gray-700 font-light col-start-2">
                  Предоставляем скидки и выгодные предложения от фирмы.
                </span>
              </div>
            </ContentSectionContent>
          </ContentSection>
          <ContentSection>
            <ContentSectionTitle className="hover:scale-102 transition-transform duration-200 cursor-default">
              Лицензии
            </ContentSectionTitle>
            <ContentSectionContent className="grid grid-cols-5 gap-8">
              <Image
                alt="Документ 1"
                src="/doc1.jpg"
                width="200"
                height="200"
              ></Image>
              <Image
                alt="Документ 2"
                src="/doc2.jpg"
                width="200"
                height="200"
              ></Image>
              <Image
                alt="Документ 3"
                src="/doc3.jpg"
                width="200"
                height="200"
              ></Image>
              <Image
                alt="Документ 4"
                src="/doc4.jpg"
                width="200"
                height="200"
              ></Image>
              <Image
                alt="Документ 5"
                src="/doc5.jpg"
                width="200"
                height="200"
              ></Image>
            </ContentSectionContent>
          </ContentSection>
        </div>
      </main>
    </div>
  )
}

export default About
