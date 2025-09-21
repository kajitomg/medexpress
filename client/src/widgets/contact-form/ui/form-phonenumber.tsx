"use client"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button, Typography } from "@/shared/ui"
import { Form, FormField } from "@/shared/ui/form"
import { ContactFormSchemaPhonenumber } from "@/widgets/contact-form/model"
import { useContactForm } from "@/widgets/contact-form/provider"
import { FormCheckboxField } from "@/widgets/contact-form/ui/form-checkbox-field"
import { FormInputField } from "@/widgets/contact-form/ui/form-input-field"
import { FormTextareaField } from "@/widgets/contact-form/ui/form-textarea-field"
import { Loader } from "lucide-react"
import Link from "next/link"
import React, { ComponentProps, useEffect, useState } from "react"
import Turnstile from "react-turnstile"

interface FormPhonenumberProps {
  isLoading: boolean
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  setToken: (token: string) => void
}

const FormPhonenumber = ({
  handleSubmit,
  isLoading,
  setToken,
  className,
  ...props
}: ComponentProps<"form"> & FormPhonenumberProps) => {
  const [isCaptcha, setIsCaptcha] = useState<boolean>(false)
  const form = useContactForm<ContactFormSchemaPhonenumber>()

  const isValid = isCaptcha && form.formState.isValid

  useEffect(() => {
    form.trigger("mode")
  }, [isCaptcha])

  return (
    <Form {...form}>
      <form
        className={cn("w-full space-y-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <FormField
          control={form.control}
          name="firstname"
          defaultValue={""}
          render={({ field }) => (
            <FormInputField
              label="Имя"
              type="text"
              placeholder="Введите имя*"
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="phonenumber"
          defaultValue={""}
          render={({ field }) => (
            <FormInputField
              label="Телефон"
              type="tel"
              placeholder="Введите номер телефона*"
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="message"
          defaultValue={""}
          render={({ field }) => (
            <FormTextareaField
              label="Комментарий к заказу"
              placeholder="Введите комментарий"
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          defaultValue={false}
          render={({ field }) => (
            <FormCheckboxField
              label={
                <div>
                  Согласие с{" "}
                  <Typography asChild variant="link">
                    <Link href={routes.PRIVATEPOLICY.path}>
                      политикой конфиденциальности
                    </Link>
                  </Typography>
                </div>
              }
              field={field}
            />
          )}
        />
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE!}
          size="flexible"
          onSuccess={(token) => {
            setIsCaptcha(true)
            setToken(token)
          }}
        />
        <Button
          className="cursor-pointer rounded-full w-full"
          type="submit"
          disabled={isLoading || !isValid}
          variant="brand"
          size="xl"
        >
          Оставить заявку
          {isLoading && <Loader className="animate-spin" />}
        </Button>
      </form>
    </Form>
  )
}

export { FormPhonenumber }
