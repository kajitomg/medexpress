import validator from "validator"
import { z } from "zod"

const contactFormSchemaEmail = z.object({
  mode: z.literal("email"),
  firstname: z
    .string("Обязательное поле")
    .min(2, "Минимальная длина поля 2 символа"),
  email: z.email("Некорректный формат поля"),
  message: z
    .string()
    .max(200, "Максимальная длина поля 200 символа")
    .optional(),
  terms: z
    .boolean()
    .refine(
      (val) => val === true,
      "Примите условия обработки персональных данных"
    ),
})

const contactFormSchemaPhonenumber = z.object({
  mode: z.literal("phonenumber"),
  firstname: z
    .string("Обязательное поле")
    .min(2, "Минимальная длина поля 2 символа"),
  phonenumber: z
    .string()
    .refine(validator.isMobilePhone, "Некорректный формат поля"),
  message: z
    .string()
    .max(350, "Максимальная длина поля 350 символа")
    .optional(),
  terms: z
    .boolean()
    .refine(
      (val) => val === true,
      "Примите условия обработки персональных данных"
    ),
})

const contactFormSchema = z.discriminatedUnion("mode", [
  contactFormSchemaEmail,
  contactFormSchemaPhonenumber,
])

type ContactFormSchema = z.infer<typeof contactFormSchema>

type ContactFormSchemaEmail = z.infer<typeof contactFormSchemaEmail>
type ContactFormSchemaPhonenumber = z.infer<typeof contactFormSchemaPhonenumber>

export {
  contactFormSchemaEmail,
  contactFormSchemaPhonenumber,
  contactFormSchema,
}
export type {
  ContactFormSchema,
  ContactFormSchemaEmail,
  ContactFormSchemaPhonenumber,
}
