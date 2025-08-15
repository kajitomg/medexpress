import { cn } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { Control, Field, Root, Submit } from "@radix-ui/react-form"
import * as React from "react"
import { ComponentProps } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface HeroFormProps {
  register: UseFormRegisterReturn<"email">
}

const HeroForm = ({
  register,
  onSubmit,
  className,
}: ComponentProps<"form"> & HeroFormProps) => {
  return (
    <Root className={cn("flex gap-x-2", className)} onSubmit={onSubmit}>
      <Field name="email" className="min-w-50">
        <Control asChild>
          <Input
            {...register}
            type="email"
            placeholder="Введите e-mail*"
            variant="brand"
            mysize="lg"
            className={cn(
              "rounded-4xl font-normal md:font-bold placeholder:text-base md:placeholder:text-lg md:text-lg text-base md:text-lg h-10 p-4 md:h-14 md:p-6 md:px-8"
            )}
          />
        </Control>
      </Field>
      <Submit asChild>
        <Button
          className="cursor-pointer rounded-4xl font-normal md:font-bold text-base md:text-lg h-10 p-4 md:h-14 md:p-6 md:px-8"
          variant="brand"
          size="xl"
        >
          Оставить заявку
        </Button>
      </Submit>
    </Root>
  )
}

export { HeroForm }
