"use client"

import {
  contactFormSchema,
  ContactFormSchema,
} from "@/widgets/contact-form/model"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode } from "react"
import {
  FormProvider,
  useForm,
  useFormContext,
  UseFormProps,
} from "react-hook-form"

export const ContactFormProvider = ({
  children,
  options,
}: {
  children: ReactNode
  options?: Omit<UseFormProps<ContactFormSchema>, "resolver">
}) => {
  const methods = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      mode: "email",
    },
    mode: "all",
    ...options,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

export const useContactForm = <
  T extends ContactFormSchema = ContactFormSchema,
>() => {
  return useFormContext<T>()
}
