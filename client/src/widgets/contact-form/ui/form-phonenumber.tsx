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
import { ComponentProps } from "react"
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form"
import { ContactFormSchema, ContactFormSchemaPhonenumber } from "../model"

interface FormPhonenumberProps {
  register: (
    name: keyof ContactFormSchemaPhonenumber,
    options?: RegisterOptions<
      ContactFormSchema,
      keyof ContactFormSchemaPhonenumber
    >
  ) => UseFormRegisterReturn<keyof ContactFormSchemaPhonenumber>
  isDirty: boolean
  isSubmitting: boolean
  isValid: boolean
}

const FormPhonenumber = ({
  register,
  isSubmitting,
  isDirty,
  isValid,
  className,
}: ComponentProps<"div"> & FormPhonenumberProps) => {
  return (
    <Root className={className}>
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
          <Message
            className="text-xs font-bold text-red-500"
            match="valueMissing"
          >
            Пожалуйста, введите имя
          </Message>
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
      <Field name="phonenumber" className="mt-4">
        <div
          className="mx-2 mb-2"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Label className="font-bold text-sm">Телефон</Label>
          <Message
            className="text-xs font-bold text-red-500"
            match="valueMissing"
          >
            Пожалуйста, введите номер телефона
          </Message>
          <Message
            className="text-xs font-bold text-red-500"
            match="typeMismatch"
          >
            Пожалуйста, введите действительный номер телефона
          </Message>
        </div>
        <Control asChild>
          <Input
            {...register("phonenumber")}
            type="text"
            placeholder="Введите номер телефона*"
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
          <Label asChild>
            <span className="text-sm font-semibold">
              Согласие на обработку персональных данных
            </span>
          </Label>
        </div>
      </Field>
      <Submit asChild className="mt-8">
        <Button
          className="cursor-pointer rounded-full w-full"
          disabled={!isDirty || isSubmitting || !isValid}
          variant="brand"
          size="xl"
        >
          Оставить заявку
        </Button>
      </Submit>
    </Root>
  )
}
export { FormPhonenumber }
