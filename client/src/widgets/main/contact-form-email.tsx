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
import { HomeFormDataType } from "../../../app/(public)/(main-layout)/(main)/page"

interface ContactFormEmailProps {
  formData: HomeFormDataType
  onFormChange: (
    field: keyof HomeFormDataType
  ) => (value: string | boolean) => void
}

const ContactFormEmail = ({
  onFormChange,
  formData,
  className,
}: ComponentProps<"div"> & ContactFormEmailProps) => {
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
            type="text"
            placeholder="Введите имя*"
            required
            value={formData.name || ""}
            onChange={(e) => onFormChange("name")(e.target.value)}
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
          <Message
            className="text-xs font-bold text-red-500"
            match="valueMissing"
          >
            Пожалуйста, введите e-mail
          </Message>
          <Message
            className="text-xs font-bold text-red-500"
            match="typeMismatch"
          >
            Пожалуйста, введите действительный e-mail
          </Message>
        </div>
        <Control asChild>
          <Input
            type="email"
            placeholder="Введите e-mail*"
            required
            value={formData.email || ""}
            onChange={(e) => onFormChange("email")(e.target.value)}
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
            placeholder="Введите комментарий"
            value={formData.message || ""}
            onChange={(e) => onFormChange("message")(e.target.value)}
            className={cn(
              "focus-visible:ring-1 focus-visible:ring-blue-400 font-semibold text-sm placeholder:text-sm bg-muted max-h-50"
            )}
          />
        </Control>
      </Field>
      <Field name="consent" className="mt-6">
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => onFormChange("consent")(!formData.consent)}
        >
          <Control asChild>
            <Input
              type="checkbox"
              checked={formData.consent || false}
              onChange={() => onFormChange("consent")(!formData.consent)}
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
          disabled={!formData["consent"]}
          variant="brand"
          size="xl"
        >
          Оставить заявку
        </Button>
      </Submit>
    </Root>
  )
}
export { ContactFormEmail }
