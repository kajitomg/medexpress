import { cn } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { Control, Field, Root, Submit } from "@radix-ui/react-form"
import * as React from "react"
import { ComponentProps } from "react"

interface MainPageHeroFormProps {
  input: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}

const MainPageHeroForm = ({
  onInputChange,
  onSubmit,
  input,
  className,
}: ComponentProps<"div"> & MainPageHeroFormProps) => {
  return (
    <Root className={cn("flex gap-x-2", className)}>
      <Field name="email" className="min-w-50">
        <Control asChild>
          <Input
            type="email"
            placeholder="Введите e-mail*"
            variant="brand"
            mysize="lg"
            required
            value={input || ""}
            onChange={onInputChange}
            className={cn("rounded-4xl")}
          />
        </Control>
      </Field>
      <Submit asChild>
        <Button
          className="cursor-pointer rounded-4xl"
          variant="brand"
          size="xl"
          onClick={onSubmit}
        >
          Оставить заявку
        </Button>
      </Submit>
    </Root>
  )
}

export { MainPageHeroForm }
