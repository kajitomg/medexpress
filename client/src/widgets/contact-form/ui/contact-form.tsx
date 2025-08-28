"use client"

import { cn } from "@/shared/lib"
import {
  Card,
  CardContent,
  CardHeader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@/shared/ui"
import { Alert, AlertTitle } from "@/shared/ui/alert"
import { ContactFormSchema, FormStatus } from "@/widgets/contact-form/model"
import { FormEmail } from "@/widgets/contact-form/ui/form-email"
import { FormPhonenumber } from "@/widgets/contact-form/ui/form-phonenumber"
import { CheckCheck, X } from "lucide-react"
import { BaseSyntheticEvent, ComponentProps, useState } from "react"
import { toast } from "sonner"
import { useContactForm } from "../provider"

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
  const [status, setStatus] = useState<FormStatus>("idle")
  const methods = useContactForm()
  const mode = methods.watch("mode")
  const onSubmit = methods.handleSubmit(async (data, event) => {
    if (!data.terms) {
      toast.custom(() => (
        <Alert variant="destructive">
          <X />
          <AlertTitle>Не принято пользовательское соглашение.</AlertTitle>
        </Alert>
      ))
      setStatus("error")
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
          toast.custom(() => (
            <Alert className="text-green-600 sm:w-100 dark:text-green-400">
              <CheckCheck />
              <AlertTitle>Запрос успешно отправлен</AlertTitle>
            </Alert>
          ))
          setStatus("send")
        } else {
          toast.custom(() => (
            <Alert variant="destructive">
              <X />
              <AlertTitle>{response.message}</AlertTitle>
            </Alert>
          ))
          setStatus("error")
        }
        return response
      } catch {
        toast.custom(() => (
          <Alert variant="destructive">
            <X />
            <AlertTitle>Произошла непредвиденная ошибка.</AlertTitle>
          </Alert>
        ))
        setStatus("error")
        return {
          success: false,
          message: "Произошла непредвиденная ошибка.",
        }
      }
  })

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <Typography asChild variant="h4">
          <h4>{title}</h4>
        </Typography>
        <Typography variant="muted">{subtitle}</Typography>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={"email"} value={mode} className="gap-6">
          <TabsList className="w-full min-w-0">
            <TabsTrigger
              value={"email"}
              className="cursor-pointer min-w-0"
              onClick={() => methods.setValue("mode", "email")}
            >
              Почта
            </TabsTrigger>
            <TabsTrigger
              value={"phonenumber"}
              className="cursor-pointer min-w-0"
              onClick={() => {
                methods.setValue("mode", "phonenumber")
              }}
            >
              Телефон
            </TabsTrigger>
          </TabsList>
          <TabsContent value={"email"} className=" min-w-0">
            <FormEmail
              isLoading={status === "sending"}
              handleSubmit={onSubmit}
            />
          </TabsContent>
          <TabsContent value={"phonenumber"}>
            <FormPhonenumber
              isLoading={status === "sending"}
              handleSubmit={onSubmit}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export { ContactForm }
