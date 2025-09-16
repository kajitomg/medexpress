import { cn } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { Control, Field, Root, Submit } from "@radix-ui/react-form"
import * as React from "react"
import { ComponentProps } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface HeroFormProps {
  register: UseFormRegisterReturn<"email">
  inputPlaceholder?: string
  buttonText?: string
}

const HeroForm = ({
  register,
  onSubmit,
  inputPlaceholder = "Введите e-mail*",
  buttonText = "Оставить заявку",
  className,
}: ComponentProps<"form"> & HeroFormProps) => {
  return (
    <Root className={cn("flex gap-x-2", className)} onSubmit={onSubmit}>
      <Field name="email" className="min-w-50">
        <Control asChild>
          <Input
            {...register}
            type="email"
            variant="brand"
            placeholder={inputPlaceholder}
            className={cn(
              "rounded-4xl font-normal md:font-bold placeholder:text-base md:placeholder:text-lg md:text-lg text-base md:text-lg h-10 p-4 md:h-14 md:p-6 md:px-8"
            )}
          />
        </Control>
      </Field>
      <Submit asChild>
        <Button
          variant="brand"
          className="cursor-pointer rounded-4xl font-normal md:font-bold text-base md:text-lg h-10 p-4 md:h-14 md:p-6 md:px-8"
        >
          {buttonText}
        </Button>
      </Submit>
    </Root>
  )
}

export { HeroForm }
