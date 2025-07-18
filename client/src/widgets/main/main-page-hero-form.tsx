import { cn } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { Control, Field, Root, Submit } from "@radix-ui/react-form"
import * as React from "react"
import { ComponentProps } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface MainPageHeroFormProps {
  register: UseFormRegisterReturn<"email">
}

const MainPageHeroForm = ({
  register,
  onSubmit,
  className,
}: ComponentProps<"form"> & MainPageHeroFormProps) => {
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
            className={cn("rounded-4xl")}
          />
        </Control>
      </Field>
      <Submit asChild>
        <Button
          className="cursor-pointer rounded-4xl"
          variant="brand"
          size="xl"
        >
          Оставить заявку
        </Button>
      </Submit>
    </Root>
  )
}

export { MainPageHeroForm }
