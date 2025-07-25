import validator from "validator"
import { z } from "zod"

const contactFormSchemaEmail = z.object({
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

type ContactFormSchemaEmail = z.infer<typeof contactFormSchemaEmail>
type ContactFormSchemaPhonenumber = z.infer<typeof contactFormSchemaPhonenumber>

type ContactFormSchema = ContactFormSchemaEmail | ContactFormSchemaPhonenumber

export { contactFormSchemaEmail, contactFormSchemaPhonenumber }
export type {
  ContactFormSchema,
  ContactFormSchemaEmail,
  ContactFormSchemaPhonenumber,
}
