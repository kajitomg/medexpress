import validator from "validator"
import { z } from "zod"

export const formSchema = z.object({
  firstname: z.string("Обязательное поле"),
  email: z.email("Некорректный e-mail адрес"),
  phonenumber: z.string().refine(validator.isMobilePhone),
  message: z.string().max(200).optional(),
  terms: z.literal(true, "Примите условия использования"),
})

export const formSchemaEmail = z.object({
  firstname: z.string("Обязательное поле"),
  email: z.email("Некорректный e-mail адрес"),
  message: z.string().max(200).optional(),
  terms: z.literal(true, "Примите условия использования"),
})

export const formSchemaPhonenumber = z.object({
  firstname: z.string("Обязательное поле"),
  phonenumber: z.string().refine(validator.isMobilePhone),
  message: z.string().max(200).optional(),
  terms: z.literal(true, "Примите условия использования"),
})
