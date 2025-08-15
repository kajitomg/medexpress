import { Checkbox } from "@/shared/ui/checkbox"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import React, { ReactNode } from "react"
import { ControllerRenderProps } from "react-hook-form"

interface FormInputFieldProps {
  label: string | ReactNode
  field: ControllerRenderProps<any>
}

const FormCheckboxField = ({
  field: { value, onChange, ...field },
  label,
}: FormInputFieldProps) => {
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
