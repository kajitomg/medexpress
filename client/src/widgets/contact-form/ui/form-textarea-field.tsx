import { Textarea } from "@/shared/ui"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import React, { ReactNode } from "react"
import { ControllerRenderProps } from "react-hook-form"

interface FormInputFieldProps {
  label: string | ReactNode
  placeholder: string
  field: ControllerRenderProps<any>
}

const FormTextareaField = ({
  field,
  label,
  placeholder,
}: FormInputFieldProps) => {
  return (
    <FormItem>
      <FormLabel className="mx-2 mb-1">{label}</FormLabel>
      <FormControl>
        <Textarea
          placeholder={placeholder}
          className="focus-visible:ring-1 focus-visible:ring-blue-400 text-sm placeholder:text-sm bg-muted max-h-50"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export { FormTextareaField }
