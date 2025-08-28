"use client"
import { Input } from "@/shared/ui"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import React, { HTMLInputTypeAttribute, ReactNode } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

interface FormInputFieldProps<T extends FieldValues> {
  type?: HTMLInputTypeAttribute
  label: string | ReactNode
  placeholder: string
  field: ControllerRenderProps<T>
}

function FormInputField<T extends FieldValues>({
  field,
  label,
  placeholder,
  type,
}: FormInputFieldProps<T>) {
  return (
    <FormItem>
      <FormLabel className="mx-2 mb-1">{label}</FormLabel>
      <FormControl>
        <Input
          type={type}
          placeholder={placeholder}
          className="focus-visible:ring-1 focus-visible:ring-blue-400 text-sm placeholder:text-sm bg-muted"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export { FormInputField }
