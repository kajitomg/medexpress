import validator from "validator"
import { z } from "zod"

const contactFormSchemaEmail = z.object({
  firstname: z.string("Обязательное поле").min(2),
  email: z.email("Некорректный e-mail адрес"),
  message: z.string().max(200).optional(),
  terms: z.literal(true, "Примите условия использования"),
})

const contactFormSchemaPhonenumber = z.object({
  firstname: z.string("Обязательное поле").min(2),
  phonenumber: z.string().refine(validator.isMobilePhone),
  message: z.string().max(200).optional(),
  terms: z.literal(true, "Примите условия использования"),
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
