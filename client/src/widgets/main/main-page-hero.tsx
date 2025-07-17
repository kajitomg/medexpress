import {
  PageHero,
  PageHeroBackground,
  PageHeroContent,
} from "@/shared/ui/page-hero"
import { Title } from "@/shared/ui/title"
import { MainPageHeroForm } from "@/widgets/main/main-page-hero-form"
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
    <PageHero height="full">
      <PageHeroBackground>
        <Image
          src="/squared-background 3.png"
          alt="preview backgound"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
        <div className="absolute w-full h-1/4 bottom-0 from-transparent to-white bg-gradient-to-b" />
      </PageHeroBackground>
      <PageHeroContent>
        <div className="relative max-w-260 top-2/5 left-1/2 -translate-1/2 flex flex-col items-center">
          <Title className="text-6xl cursor-default hover-scale text-center">
            <strong>
              <span className="text-(--color-brand) font-black">
                Medexpress
              </span>{" "}
              - ваш надежный партнер в мире медицинского оборудования
            </strong>
          </Title>
          <div className="max-w-140 mt-12 text-center">
            <span className="text-2xl cursor-default">
              <strong>Записаться на консультацию</strong>
            </span>
            <div className="mt-4">
              <MainPageHeroForm
                input={input}
                onInputChange={callbacks.onInputChange}
                onSubmit={callbacks.onScrollToForm}
              />
            </div>
          </div>
        </div>
      </PageHeroContent>
    </PageHero>
  )
}

export { MainPageHero }
