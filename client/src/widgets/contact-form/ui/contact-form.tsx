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
  FormStatus,
} from "@/widgets/contact-form/model"
import * as React from "react"
import { BaseSyntheticEvent, ComponentProps, useEffect, useState } from "react"
import { useTurnstile } from "react-turnstile"
import { useContactForm, useContactFormModeStore } from "../provider"
import { FormEmail } from "./form-email"
import { FormPhonenumber } from "./form-phonenumber"

interface ContactFormProps {
  title?: string
  subtitle?: string
  handleSubmit?: (
    data: ContactFormSchema,
    event?: BaseSyntheticEvent
  ) => Promise<{ success: boolean; message: string }>
}

const ContactForm = ({
  title = "Запросить консультацию",
  subtitle = "Подскажем, какие модели подходят именно под ваши нужды",
  handleSubmit,
  className,
}: ComponentProps<"div"> & ContactFormProps) => {
  const turnstile = useTurnstile()
  const [isCaptcha, setIsCaptcha] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = React.useState<FormStatus>("idle")
  const mode = useContactFormModeStore((state) => state.mode)
  const setMode = useContactFormModeStore((state) => state.setMode)
  const methods = useContactForm()

  const callbacks = {
    onSubmit: methods.handleSubmit(async (data, event) => {
      if (!data.terms) {
        return console.error("Не принято пользовательское соглашение")
      }
      setStatus("sending")
      event?.preventDefault()
      if (handleSubmit)
        await handleSubmit(data, event).then((value) => {
          if (value?.success) {
            methods.reset({
              message: "",
              phonenumber: "",
              firstname: "",
              terms: false,
              email: "",
            })
            setStatus("send")
            setMessage(value.message)
          } else {
            setStatus("error")
            setMessage(value.message)
          }
        })
    }),
  }

  useEffect(() => {
    setIsValid(
      isCaptcha &&
        methods.formState.isValid &&
        methods.formState.isDirty &&
        !methods.formState.isSubmitting
    )
  }, [
    methods.formState.isValid,
    methods.formState.isDirty,
    methods.formState.isSubmitting,
    isCaptcha,
  ])

  return (
    <Card className={className}>
      <CardHeader>
        <Title asChild className="text-xl">
          <h6>
            <strong>{title}</strong>
          </h6>
        </Title>
        <Subtitle className="text-sm">{subtitle}</Subtitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={ContactFormMode.EMAIL} value={mode}>
          <TabsList className="w-full">
            <TabsTrigger
              value={ContactFormMode.EMAIL}
              className="cursor-pointer"
              onClick={() => {
                setIsCaptcha(false)
                setMode(ContactFormMode.EMAIL)
              }}
            >
              Почта
            </TabsTrigger>
            <TabsTrigger
              value={ContactFormMode.PHONENUMBER}
              className="cursor-pointer"
              onClick={() => {
                setIsCaptcha(false)
                setMode(ContactFormMode.PHONENUMBER)
              }}
            >
              Телефон
            </TabsTrigger>
          </TabsList>
          <TabsContent value={ContactFormMode.EMAIL}>
            <FormEmail
              register={methods.register}
              errors={methods.formState.errors}
              isValid={isValid}
              isLoading={status === "sending"}
              isErrorRequest={status === "error"}
              setIsCaptcha={setIsCaptcha}
              onSubmit={callbacks.onSubmit}
              message={message}
            />
          </TabsContent>
          <TabsContent value={ContactFormMode.PHONENUMBER}>
            <FormPhonenumber
              register={methods.register}
              errors={methods.formState.errors}
              isValid={isValid}
              isLoading={status === "sending"}
              isErrorRequest={status === "error"}
              setIsCaptcha={setIsCaptcha}
              onSubmit={callbacks.onSubmit}
              message={message}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export { ContactForm }
