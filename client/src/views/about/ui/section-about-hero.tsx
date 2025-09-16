import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { AboutHero } from "@/shared/model/strapi/elements/about-hero"
import {
  Button,
  ContentSection,
  ContentSectionContent,
  Typography,
} from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { useContactForm } from "@/widgets/contact-form/provider"
import Image from "next/image"
import * as React from "react"
import Markdown from "react-markdown"

interface SectionAboutHeroProps {
  onScrollToForm: () => void
  data?: AboutHero
}

const SectionAboutHero = ({ data, onScrollToForm }: SectionAboutHeroProps) => {
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
                alt={data?.poster?.name || 'Изображение секции "О нас"'}
                src={imageUrlBuilder(data?.poster?.url)}
                width="1000"
                height="1000"
                className="w-full h-full object-cover"
              ></Image>
            </AspectRatio>
          </div>
          <div className="flex-1/2">
            <Markdown
              components={{
                h6: ({ children }) => (
                  <Typography variant="lead">{children}</Typography>
                ),
                h2: ({ children }) => (
                  <Typography asChild variant="display_small">
                    <div>{children}</div>
                  </Typography>
                ),
                p: ({ children }) => (
                  <Typography className="mt-4">{children}</Typography>
                ),
              }}
            >
              {data?.content}
            </Markdown>
            <Button
              className="cursor-pointer rounded-4xl font-normal md:font-bold text-base md:text-lg h-10 p-4 md:h-14 md:p-6 md:px-8 mt-4 w-full sm:w-auto"
              variant="brand"
              size="xl"
              onClick={callbacks.onScrollToForm}
            >
              {data?.formButton}
            </Button>
          </div>
        </div>
      </ContentSectionContent>
    </ContentSection>
  )
}
export { SectionAboutHero }
