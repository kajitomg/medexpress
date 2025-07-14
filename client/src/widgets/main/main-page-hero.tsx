import { Button, Input } from "@/shared/ui"
import Image from "next/image"
import * as React from "react"
import { ComponentProps, useState } from "react"

interface MainPageHeroProps {
  onScrollToForm: () => void
  onEmailChange: (value: string) => void
}

const MainPageHero = ({
  onScrollToForm,
  onEmailChange,
}: ComponentProps<"section"> & MainPageHeroProps) => {
  const [input, setInput] = useState<string>("")
  const callbacks = {
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value)
    },
    onScrollToForm: () => {
      onEmailChange(input)
      onScrollToForm()
      setInput("")
    },
  }
  return (
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
              удовлетворить потребности медицинских учреждений и профессионалов.
              Свяжитесь с нами для получения дополнительной информации.
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
                value={input}
                onChange={callbacks.onInputChange}
              />
              <Button
                size="xl"
                variant="brand"
                className="cursor-pointer rounded-4xl"
                onClick={callbacks.onScrollToForm}
              >
                Оставить заявку
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-1/4 from-transparent to-white bg-gradient-to-b "></div>
    </section>
  )
}

export { MainPageHero }
