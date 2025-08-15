import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button, Typography } from "@/shared/ui"
import { Form, FormField } from "@/shared/ui/form"
import { ContactFormSchemaEmail } from "@/widgets/contact-form/model"
import { useContactForm } from "@/widgets/contact-form/provider"
import { FormCheckboxField } from "@/widgets/contact-form/ui/form-checkbox-field"
import { FormInputField } from "@/widgets/contact-form/ui/form-input-field"
import { FormTextareaField } from "@/widgets/contact-form/ui/form-textarea-field"
import { Loader } from "lucide-react"
import Link from "next/link"
import React, { ComponentProps, useState } from "react"
import Turnstile from "react-turnstile"

interface FormEmailProps {
  isLoading: boolean
}

const FormEmail = ({
  isLoading,
  className,
  ...props
}: ComponentProps<"form"> & FormEmailProps) => {
  const [isCaptcha, setIsCaptcha] = useState<boolean>(false) // УЯЗВИМОСТЬ! При переходе к реальной капче использовать валидацию при отправке запроса
  const {
    formState: { isValid: isValidForm, isDirty, ...formState },
    ...form
  } = useContactForm<ContactFormSchemaEmail>()

  const isValid = isCaptcha && isValidForm && isDirty

  return (
    <Form {...form} formState={{ ...formState, isValid: isValidForm, isDirty }}>
      <form className={cn("w-full space-y-6", className)} {...props}>
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
          name="email"
          defaultValue={""}
          render={({ field }) => (
            <FormInputField
              label="E-mail"
              type="email"
              placeholder="Введите e-mail*"
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
          sitekey="1x00000000000000000000AA"
          onSuccess={() => {
            setIsCaptcha(true)
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

export { FormEmail }
