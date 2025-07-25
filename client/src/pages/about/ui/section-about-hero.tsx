import {
  Button,
  ContentSection,
  ContentSectionContent,
  Title,
} from "@/shared/ui"
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
            <Title asChild>
              <h6 className="text-xl font-light">
                <strong>О нас</strong>
              </h6>
            </Title>
            <h4 className="font-bold text-4xl mt-2">
              <span>
                Medexpress: Ваш надежный партнер в обеспечении доступности
                передовых медицинских технологий.
              </span>
            </h4>
            <span className="inline-block mt-8 text-gray-700 font-light">
              Мы обеспечиваем быструю и бесперебойную доставку передовых
              технологий, чтобы врачи могли своевременно оказывать помощь и
              спасать жизни. Наша миссия – сделать современные медицинские
              решения доступными для каждого учреждения.
            </span>
            <Button
              size="xl"
              variant="brand"
              className="cursor-pointer rounded-4xl mt-4"
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
