"use client"

import { cn } from "@/shared/lib"
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
import { BaseSyntheticEvent, ComponentProps, useState } from "react"
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
  ...props
}: ComponentProps<"div"> & ContactFormProps) => {
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<FormStatus>("idle")
  const mode = useContactFormModeStore((state) => state.mode)
  const setMode = useContactFormModeStore((state) => state.setMode)
  const methods = useContactForm()

  const onSubmit = methods.handleSubmit(async (data, event) => {
    if (!data.terms) {
      setStatus("error")
      setMessage("Не принято пользовательское соглашение.")
      return {
        success: false,
        message: "Не принято пользовательское соглашение.",
      }
    }
    setStatus("sending")
    event?.preventDefault()
    if (handleSubmit)
      try {
        const response = await handleSubmit(data, event)
        if (response.success) {
          methods.reset({
            message: "",
            phonenumber: "",
            firstname: "",
            terms: false,
            email: "",
          })
          setStatus("send")
          setMessage(response.message)
        } else {
          setStatus("error")
          setMessage(response.message)
        }
        return response
      } catch (e) {
        setStatus("error")
        setMessage("Произошла непредвиденная ошибка.")
        return {
          success: false,
          message: "Произошла непредвиденная ошибка.",
        }
      }
  })

  return (
    <Card className={cn(className)} {...props}>
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
          <TabsList className="w-full min-w-0">
            <TabsTrigger
              value={ContactFormMode.EMAIL}
              className="cursor-pointer min-w-0"
              onClick={() => setMode(ContactFormMode.EMAIL)}
            >
              Почта
            </TabsTrigger>
            <TabsTrigger
              value={ContactFormMode.PHONENUMBER}
              className="cursor-pointer min-w-0"
              onClick={() => setMode(ContactFormMode.PHONENUMBER)}
            >
              Телефон
            </TabsTrigger>
          </TabsList>
          <TabsContent value={ContactFormMode.EMAIL} className=" min-w-0">
            <FormEmail
              isLoading={status === "sending"}
              isErrorRequest={status === "error"}
              onSubmit={onSubmit}
              message={message}
            />
          </TabsContent>
          <TabsContent value={ContactFormMode.PHONENUMBER}>
            <FormPhonenumber
              isLoading={status === "sending"}
              isErrorRequest={status === "error"}
              onSubmit={onSubmit}
              message={message}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export { ContactForm }
