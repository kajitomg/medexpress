"use client"
import { Textarea } from "@/shared/ui"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import React, { ReactNode } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

interface FormInputFieldProps<T extends FieldValues> {
  label: string | ReactNode
  placeholder: string
  field: ControllerRenderProps<T>
}

function FormTextareaField<T extends FieldValues>({
  field,
  label,
  placeholder,
}: FormInputFieldProps<T>) {
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
