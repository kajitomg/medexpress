import { cn } from "@/shared/lib"
import { Button, Input, Textarea } from "@/shared/ui"
import {
  Control,
  Field,
  Label,
  Message,
  Root,
  Submit,
} from "@radix-ui/react-form"
import { Loader } from "lucide-react"
import { ComponentProps } from "react"
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form"
import Turnstile from "react-turnstile"
import { ContactFormSchema, ContactFormSchemaEmail } from "../model"

interface FormEmailProps {
  register: (
    name: keyof ContactFormSchemaEmail,
    options?: RegisterOptions<ContactFormSchema, keyof ContactFormSchemaEmail>
  ) => UseFormRegisterReturn<keyof ContactFormSchemaEmail>
  errors: FieldErrors<ContactFormSchemaEmail>
  isValid: boolean
  isLoading: boolean
  isErrorRequest: boolean
  setIsCaptcha: (isCaptcha: boolean) => void
  message: string | null
}

const FormEmail = ({
  register,
  errors,
  isValid,
  isLoading,
  isErrorRequest,
  setIsCaptcha,
  message,
  className,
  ...props
}: ComponentProps<"form"> & FormEmailProps) => {
  return (
    <Root className={cn(className)} {...props}>
      <Field name="name">
        <div
          className="mx-2 mb-2"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Label className="font-bold text-sm">Имя</Label>
          {errors.firstname && (
            <Message className="text-xs font-bold text-red-500">
              {errors.firstname.message}
            </Message>
          )}
        </div>
        <Control asChild>
          <Input
            {...register("firstname")}
            type="text"
            placeholder="Введите имя*"
            className={cn(
              "focus-visible:ring-1 focus-visible:ring-blue-400 font-semibold bg-muted"
            )}
          />
        </Control>
      </Field>
      <Field name="email" className="mt-4">
        <div
          className="mx-2 mb-2"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Label className="font-bold text-sm">E-mail адрес</Label>
          {errors.email && (
            <Message className="text-xs font-bold text-red-500">
              {errors.email.message}
            </Message>
          )}
        </div>
        <Control asChild>
          <Input
            {...register("email")}
            type="email"
            placeholder="Введите e-mail*"
            className={cn(
              "focus-visible:ring-1 focus-visible:ring-blue-400 font-semibold bg-muted"
            )}
          />
        </Control>
      </Field>
      <Field name="message" className="mt-4">
        <div
          className="mx-2 mb-2"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Label className="font-bold text-sm">Комментарий к заказу</Label>
          {errors.message && (
            <Message className="text-xs font-bold text-red-500">
              {errors.message.message}
            </Message>
          )}
        </div>
        <Control asChild>
          <Textarea
            {...register("message")}
            placeholder="Введите комментарий"
            className={cn(
              "focus-visible:ring-1 focus-visible:ring-blue-400 font-semibold text-sm placeholder:text-sm bg-muted max-h-50"
            )}
          />
        </Control>
      </Field>
      <Field name="terms" className="mt-6">
        <div className="flex items-center gap-x-2 cursor-pointer">
          <Control asChild>
            <Input
              {...register("terms")}
              type="checkbox"
              className="size-4 inline-block cursor-pointer"
            />
          </Control>
          <Label className="text-sm font-semibold">
            Согласие на обработку персональных данных
          </Label>
        </div>
        <div className="min-h-6">
          {errors.terms && (
            <Message className="text-xs font-bold text-red-500">
              {errors.terms.message}
            </Message>
          )}
        </div>
      </Field>
      <Turnstile
        sitekey="1x00000000000000000000AA"
        onSuccess={() => {
          setIsCaptcha(true)
        }}
      />
      <Submit asChild className="mt-8">
        <Button
          className="cursor-pointer rounded-full w-full"
          disabled={isLoading || !isValid}
          variant="brand"
          size="xl"
        >
          Оставить заявку
          {isLoading && <Loader className="animate-spin" />}
        </Button>
      </Submit>
      <div className="min-h-6">
        {message && (
          <span
            className={cn(
              "text-sm font-semibold text-green-600",
              isErrorRequest && "text-red-500"
            )}
          >
            {message}
          </span>
        )}
      </div>
    </Root>
  )
}
export { FormEmail }
