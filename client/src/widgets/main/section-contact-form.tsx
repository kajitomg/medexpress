import {
  Button,
  ContentSection,
  ContentSectionContent,
  ContentSectionTitle,
  Input,
  Textarea,
} from "@/shared/ui"
import Image from "next/image"
import * as React from "react"
import { ComponentProps } from "react"
import { HomeFormDataType } from "../../../app/(public)/(main-layout)/(main)/page"

interface SectionContactFormProps {
  formData: HomeFormDataType
  onFormChange: (field: keyof HomeFormDataType) => (value: string) => void
}

const SectionContactForm = ({
  ref,
  formData,
  onFormChange,
}: ComponentProps<"section"> & SectionContactFormProps) => {
  return (
    <ContentSection
      className="bg-(--color-brand)/95 rounded-[50px] min-h-200 mx-2 justify-center relative overflow-hidden"
      ref={ref}
    >
      <ContentSectionTitle className="max-w-190 text-center text-white hover:scale-102 transition-transform duration-200 cursor-default">
        <span className="font-black">Medexpress</span> - ваш надежный партнер в
        мире медицинского оборудования
      </ContentSectionTitle>
      <ContentSectionContent className="mt-12 w-full max-w-130">
        <form
          id="callback-form"
          className="flex flex-col gap-2 text-center"
          action="https://formsubmit.co/elementrixmg@bk.ru"
          method="post"
        >
          <Input
            type="email"
            name="email"
            variant="brandBackgrounded"
            mysize="lg"
            placeholder="Введите email"
            className="rounded-4xl"
            value={formData.email || ""}
            onChange={(e) => onFormChange("email")(e.target.value)}
          />
          <Textarea
            placeholder="Напишите комментарий"
            name="Сообщение"
            variant="brandBackgrounded"
            size="lg"
            className="rounded-4xl"
            value={formData.message || ""}
            onChange={(e) => onFormChange("message")(e.target.value)}
          />
          <div className="flex items-center">
            <Input type="checkbox" name="check" className="w-5 h-5 m-2" />
            <span className="text-xs font-light text-white">
              Согласие на обработку персональных данных
            </span>
          </div>
          <Button
            type="submit"
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
  )
}

export { SectionContactForm }
