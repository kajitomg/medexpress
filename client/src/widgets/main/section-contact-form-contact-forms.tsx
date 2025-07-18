import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Subtitle } from "@/shared/ui/subtitle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Title } from "@/shared/ui/title"
import { ContactFormEmail } from "@/widgets/main/contact-form-email"
import { ContactFormPhonenumber } from "@/widgets/main/contact-form-phonenumber"
import * as React from "react"
import { ComponentProps } from "react"
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form"
import { FormSchema } from "../../../app/(public)/(main-layout)/(main)/page"

interface SectionContactFormContactFormsProps {
  register: (
    name: keyof FormSchema,
    options?: RegisterOptions<FormSchema, keyof FormSchema>
  ) => UseFormRegisterReturn<keyof FormSchema>
  isDirty: boolean
  isSubmitting: boolean
  isValid: boolean
  mode: "e-mail" | "phonenumber"
  setMode: (mode: "e-mail" | "phonenumber") => void
}

const SectionContactFormContactForms = ({
  isDirty,
  isSubmitting,
  isValid,
  mode,
  setMode,
  register,
  className,
}: ComponentProps<"div"> & SectionContactFormContactFormsProps) => {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <Title asChild className="text-xl">
            <h6>
              <strong>Запросить консультацию</strong>
            </h6>
          </Title>
          <Subtitle className="text-sm">
            Подскажем, какие модели подходят именно под ваши нужды
          </Subtitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="e-mail" value={mode}>
            <TabsList className="w-full">
              <TabsTrigger
                value="e-mail"
                className="cursor-pointer"
                onClick={() => setMode("e-mail")}
              >
                Почта
              </TabsTrigger>
              <TabsTrigger
                value="phonenumber"
                className="cursor-pointer"
                onClick={() => setMode("phonenumber")}
              >
                Телефон
              </TabsTrigger>
            </TabsList>
            <TabsContent value="e-mail">
              <ContactFormEmail
                register={register}
                isDirty={isDirty}
                isSubmitting={isSubmitting}
                isValid={isValid}
              />
            </TabsContent>
            <TabsContent value="phonenumber">
              <ContactFormPhonenumber
                register={register}
                isDirty={isDirty}
                isSubmitting={isSubmitting}
                isValid={isValid}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export { SectionContactFormContactForms }
