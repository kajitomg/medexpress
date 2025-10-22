import { MainPageHeroComponent } from "@/entities/_components/elements/main-page-hero"
import {
  contactFormSchemaEmail,
  ContactFormSchemaEmail,
} from "@/features/contact-form/model"
import { Typography } from "@/shared/ui"
import {
  PageHero,
  PageHeroBackground,
  PageHeroContent,
} from "@/shared/ui/page-hero"
import { HeroForm } from "@/views/main/ui/hero-form"
import { useContactForm } from "@/widgets/contact-form/provider"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import * as React from "react"
import { ComponentProps, FormEventHandler } from "react"
import { useForm } from "react-hook-form"
import Markdown from "react-markdown"

interface HeroProps {
  onScrollToForm: () => void
  data?: MainPageHeroComponent
}

const SectionHero = ({
  onScrollToForm,
  data,
}: ComponentProps<"section"> & HeroProps) => {
  const methods = useContactForm()
  const { register, reset, getValues } = useForm<
    Pick<ContactFormSchemaEmail, "email">
  >({
    resolver: zodResolver(contactFormSchemaEmail.pick({ email: true })),
  })

  const callbacks = {
    onSubmit: ((e) => {
      e.preventDefault()
      methods?.setValue("email", getValues("email"))
      onScrollToForm()
      reset()
      methods?.setValue("mode", "email")
      setTimeout(() => {
        methods?.setFocus("firstname", { shouldSelect: true })
      }, 800)
    }) as FormEventHandler<HTMLFormElement>,
  }

  return (
    <PageHero height="full" initOffsetTop={195}>
      <PageHeroBackground>
        <Image
          src="/squared-background 3.png"
          alt="preview backgound"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
        <div className="absolute w-full h-1/4 bottom-0 from-transparent to-background bg-gradient-to-b" />
      </PageHeroBackground>
      <PageHeroContent>
        <div className="absolute w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl top-1/3 left-1/2 -translate-1/2 flex flex-col items-center p-4 md:p-8">
          <Typography asChild variant="display">
            <h1 className="hover-scale text-center">
              <strong>
                <Markdown
                  components={{
                    strong: (data) => (
                      <span className="text-(--color-brand)" {...data} />
                    ),
                    p: ({ children }) => <>{children}</>,
                  }}
                >
                  {data?.display}
                </Markdown>
              </strong>
            </h1>
          </Typography>
          <div className="max-w-140 mt-12 text-center">
            <Typography variant="h4">{data?.formTitle}</Typography>
            <div className="mt-4">
              <HeroForm
                register={register("email")}
                onSubmit={callbacks.onSubmit}
                inputPlaceholder={data?.formInput}
                buttonText={data?.formButton}
              />
            </div>
          </div>
        </div>
      </PageHeroContent>
    </PageHero>
  )
}

export { SectionHero }
