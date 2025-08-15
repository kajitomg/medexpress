import { Button, ContentSection, ContentSectionContent } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { useContactForm } from "@/widgets/contact-form/provider"
import Image from "next/image"
import * as React from "react"

interface SectionAboutHeroProps {
  onScrollToForm: () => void
}

const SectionAboutHero = ({ onScrollToForm }: SectionAboutHeroProps) => {
  const methods = useContactForm()

  const callbacks = {
    onScrollToForm: () => {
      onScrollToForm()

      setTimeout(() => {
        methods?.setFocus("firstname", { shouldSelect: true })
      }, 800)
    },
  }
  return (
    <ContentSection>
      <ContentSectionContent className="flex flex-col items-center max-w-400">
        <div className="mt-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1/2 w-full">
            <AspectRatio ratio={16 / 9}>
              <Image
                alt="Коллектив"
                src="/kollektiv.jpg"
                width="1000"
                height="1000"
                className="w-full h-full object-cover"
              ></Image>
            </AspectRatio>
          </div>
          <div className="flex-1/2">
            <h6 className="text-base sm:text-lg md:text-xl font-light">
              <strong>О нас</strong>
            </h6>
            <h4 className="font-bold text-2xl md:text-4xl xl:text-5xl">
              <span>
                Medexpress: Ваш надежный партнер в обеспечении доступности
                передовых медицинских технологий.
              </span>
            </h4>
            <span className="inline-block mt-8 text-gray-700 text-sm md:text-base font-light">
              Мы обеспечиваем быструю и бесперебойную доставку передовых
              технологий, чтобы врачи могли своевременно оказывать помощь и
              спасать жизни. Наша миссия – сделать современные медицинские
              решения доступными для каждого учреждения.
            </span>

            <Button
              className="cursor-pointer rounded-4xl font-normal md:font-bold text-base md:text-lg h-10 p-4 md:h-14 md:p-6 md:px-8 mt-4 w-full sm:w-auto"
              variant="brand"
              size="xl"
              onClick={callbacks.onScrollToForm}
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      </ContentSectionContent>
    </ContentSection>
  )
}
export { SectionAboutHero }
