import { Button } from "@/shared/ui/button"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-auto">
        <section className="relative min-h-160 w-full p-5 bg-accent">
          <div className="absolute top-5 left-0 h-full bg-[#93a79e] p-8 rounded-r-[50px]">
            <div className="absolute -top-28 left-0 w-60 h-28 bg-[#93a79e] rounded-tr-[50px]"></div>
            <h1 className="text-7xl font-black text-accent">
              Медицинское оборудование <br /> с доставкой по всей России
            </h1>
            <h4 className="text-accent text-lg font-light py-5 max-w-150">
              Обеспечиваем медицинские учреждения качественным оборудованием,
              профессиональным сервисом и экспертной поддержкой на протяжении 14
              лет
            </h4>
            <Button variant="destructive" size="lg">
              Сделать заказ
            </Button>
            <span className="absolute -top-23 left-6 col-start-1 justify-self-start">
              <Link
                href="/client/public"
                className="font-black text-3xl text-white"
              >
                Medexpress
              </Link>
            </span>
          </div>
          <div className="absolute right-0">
            <Image
              src="/oborud2.png"
              alt="alt"
              width="790"
              height="551"
              className="w-auto h-130 object-cover rounded-2xl mr-4"
            />
          </div>
        </section>
        <section className="p-10">
          <h2 className="font-black text-6xl">
            Берем на себя все сложности оснащения
          </h2>
          <div className="flex max-h-150 max-w-300 bg-accent rounded-[50px] font-light overflow-hidden">
            <ul className=" p-10 font-light text-nowrap">
              <li>Доставка по всей России</li>
              <li>Таможенное оформление</li>
              <li>Сертификация и лицензирование</li>
              <li>Монтаж и пусконаладка</li>
              <li>Техническая поддержка и обслуживание</li>
              <li>Обучение персонала</li>
              <li>Гарантия на оборудование</li>
            </ul>
            <div className="h-full w-auto">
              <Image
                src="/oborud4.jpeg"
                alt="alt"
                width="8000"
                height="5784"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
        <section className="p-10">
          <h2 className="font-black text-6xl">Работаем с лидерами отрасли</h2>
          <div className="flex bg-accent rounded-[50px] font-light overflow-hidden">
            <ul className="flex justify-around w-full p-10 font-light text-nowrap">
              <li>Zinher</li>
              <li>Sambori</li>
              <li>Медзавод</li>
              <li>Остеомед-М</li>
              <li>Хронос</li>
              <li>Медиус</li>
            </ul>
          </div>
        </section>
        <section className="p-10">
          <h2 className="font-black text-6xl">
            Нам доверяют ведущие медицинские учреждения
          </h2>
          <div className="flex gap-8 p-8">
            <div className="bg-accent flex-1/4 rounded-[50px] font-light overflow-hidden">
              <Image
                src="/cabinet.webp"
                alt="cabinet"
                width="200"
                height="200"
                className="w-full max-h-50 object-cover"
              />
              <div className="flex flex-col p-10">
                <span>ГБУЗ СК Городская больница</span>
                <span>г. Невинномысск ул. Павлова 5</span>
                <span>Оснащение кабинета оториноларингологии</span>
                <span>1230101386420000123 от 24.11.2020</span>
                <span>
                  Кабинет оснащен аппаратами УЗИ, КТ, Мебелью и расходными
                  материалами
                </span>
              </div>
            </div>
            <div className="bg-accent flex-1/4 rounded-[50px] font-light overflow-hidden">
              <Image
                src="/cabinet.webp"
                alt="cabinet"
                width="200"
                height="200"
                className="w-full max-h-50 object-cover"
              />
              <div className="flex flex-col p-10">
                <span>ГБУЗ СК Городская больница</span>
                <span>г. Невинномысск ул. Павлова 5</span>
                <span>Оснащение кабинета оториноларингологии</span>
                <span>1230101386420000123 от 24.11.2020</span>
                <span>
                  Кабинет оснащен аппаратами УЗИ, КТ, Мебелью и расходными
                  материалами
                </span>
              </div>
            </div>

            <div className="bg-accent flex-1/4 rounded-[50px] font-light overflow-hidden">
              <Image
                src="/cabinet.webp"
                alt="cabinet"
                width="200"
                height="200"
                className="w-full max-h-50 object-cover"
              />
              <div className="flex flex-col p-10">
                <span>ГБУЗ СК Городская больница</span>
                <span>г. Невинномысск ул. Павлова 5</span>
                <span>Оснащение кабинета оториноларингологии</span>
                <span>1230101386420000123 от 24.11.2020</span>
                <span>
                  Кабинет оснащен аппаратами УЗИ, КТ, Мебелью и расходными
                  материалами
                </span>
              </div>
            </div>

            <div className="bg-accent flex-1/4 rounded-[50px] font-light overflow-hidden">
              <Image
                src="/cabinet.webp"
                alt="cabinet"
                width="200"
                height="200"
                className="w-full max-h-50 object-cover"
              />
              <div className="flex flex-col p-10">
                <span>ГБУЗ СК Городская больница</span>
                <span>г. Невинномысск ул. Павлова 5</span>
                <span>Оснащение кабинета оториноларингологии</span>
                <span>1230101386420000123 от 24.11.2020</span>
                <span>
                  Кабинет оснащен аппаратами УЗИ, КТ, Мебелью и расходными
                  материалами
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="p-10">
          <h2 className="font-black text-6xl">
            Выполним контракт любой сложности
          </h2>

          <div className="flex max-h-150 max-w-300 bg-accent rounded-[50px] font-light overflow-hidden">
            <div className="h-full w-auto">
              <Image
                src="/oborud4.jpeg"
                alt="alt"
                width="8000"
                height="5784"
                className="h-full w-full object-cover"
              />
            </div>
            <ul className=" p-10 font-light text-nowrap">
              <li>Каталог</li>
              <li>Услуги</li>
              <li>Подборки</li>
              <li>Конструктор кабинета</li>
              <Button>Заказать консультацию</Button>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
