import {
  ContactFormSchema,
  contactFormSchemaEmail,
  contactFormSchemaPhonenumber,
} from "@/widgets/contact-form/model"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"

export const ContactFormProvider = ({
  schema,
  children,
}: {
  schema: typeof contactFormSchemaEmail | typeof contactFormSchemaPhonenumber
  children: ReactNode
}) => {
  const methods = useForm<ContactFormSchema>({
    resolver: zodResolver(schema),
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

export const useContactForm = <
  T extends ContactFormSchema = ContactFormSchema,
>() => {
  return useFormContext<T>()
}
