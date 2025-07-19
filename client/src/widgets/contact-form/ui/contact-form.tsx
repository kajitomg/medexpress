"use client"

import {
  Card,
  CardContent,
  CardHeader,
  Subtitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Title,
} from "@/shared/ui"
import {
  ContactFormMode,
  ContactFormSchema,
  contactFormSchemaEmail,
  contactFormSchemaPhonenumber,
} from "@/widgets/contact-form/model"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { ComponentProps, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useContactFormModeStore, useContactFormStore } from "../provider"
import { FormEmail } from "./form-email"
import { FormPhonenumber } from "./form-phonenumber"

interface ContactFormProps {}

const ContactForm = ({
  className,
}: ComponentProps<"div"> & ContactFormProps) => {
  const mode = useContactFormModeStore((state) => state.mode)
  const setMode = useContactFormModeStore((state) => state.setMode)
  const setMethods = useContactFormStore((state) => state.setMethods)
  const schema =
    mode === ContactFormMode.EMAIL
      ? contactFormSchemaEmail
      : contactFormSchemaPhonenumber

  const methods = useForm<ContactFormSchema>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    setMethods(methods)
  }, [methods])
  return (
    <Card className={className}>
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
        <Tabs defaultValue={ContactFormMode.EMAIL} value={mode}>
          <TabsList className="w-full">
            <TabsTrigger
              value={ContactFormMode.EMAIL}
              className="cursor-pointer"
              onClick={() => setMode(ContactFormMode.EMAIL)}
            >
              Почта
            </TabsTrigger>
            <TabsTrigger
              value={ContactFormMode.PHONENUMBER}
              className="cursor-pointer"
              onClick={() => setMode(ContactFormMode.PHONENUMBER)}
            >
              Телефон
            </TabsTrigger>
          </TabsList>
          <TabsContent value={ContactFormMode.EMAIL}>
            <FormEmail
              register={methods.register}
              isDirty={methods.formState.isDirty}
              isSubmitting={methods.formState.isSubmitting}
              isValid={methods.formState.isValid}
            />
          </TabsContent>
          <TabsContent value={ContactFormMode.PHONENUMBER}>
            <FormPhonenumber
              register={methods.register}
              isDirty={methods.formState.isDirty}
              isSubmitting={methods.formState.isSubmitting}
              isValid={methods.formState.isValid}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export { ContactForm }
