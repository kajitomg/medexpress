"use client"
import { Checkbox } from "@/shared/ui/checkbox"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import React, { ReactNode } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

interface FormInputFieldProps<T extends FieldValues> {
  label: string | ReactNode
  field: ControllerRenderProps<T>
}

function FormCheckboxField<T extends FieldValues>({
  field: { value, onChange, ...field },
  label,
}: FormInputFieldProps<T>) {
  return (
    <>
      <div className="flex items-center gap-x-2 cursor-pointer">
        <FormItem className="flex items-center gap-x-2 cursor-pointer">
          <FormControl>
            <Checkbox
              checked={value}
              onCheckedChange={onChange}
              className="size-4 inline-block cursor-pointer"
              {...field}
            />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </FormItem>
      </div>
      <FormMessage />
    </>
  )
}

export { FormCheckboxField }
