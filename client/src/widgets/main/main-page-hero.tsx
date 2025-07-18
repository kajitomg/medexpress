import {
  PageHero,
  PageHeroBackground,
  PageHeroContent,
} from "@/shared/ui/page-hero"
import { Title } from "@/shared/ui/title"
import { MainPageHeroForm } from "@/widgets/main/main-page-hero-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import * as React from "react"
import { ComponentProps, FormEventHandler } from "react"
import { FieldPathValue, SetValueConfig, useForm } from "react-hook-form"
import { FormSchemaEmail } from "../../../app/(public)/(main-layout)/(main)/page"
import { formSchemaEmail } from "../../../app/(public)/(main-layout)/(main)/schema"

interface MainPageHeroProps {
  onScrollToForm: () => void
  setValue: (
    name: "email",
    value: FieldPathValue<Pick<FormSchemaEmail, "email">, "email">,
    options?: SetValueConfig
  ) => void
  setFocus: () => void
}

const MainPageHero = ({
  setFocus,
  onScrollToForm,
  setValue,
}: ComponentProps<"section"> & MainPageHeroProps) => {
  const { register, reset, getValues } = useForm<
    Pick<FormSchemaEmail, "email">
  >({
    resolver: zodResolver(formSchemaEmail.pick({ email: true })),
  })
  const callbacks = {
    onSubmit: ((e) => {
      e.preventDefault()
      setValue("email", getValues("email"))
      onScrollToForm()
      reset()
      setFocus()
    }) as FormEventHandler<HTMLFormElement>,
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
                register={register("email")}
                onSubmit={callbacks.onSubmit}
              />
            </div>
          </div>
        </div>
      </PageHeroContent>
    </PageHero>
  )
}

export { MainPageHero }
