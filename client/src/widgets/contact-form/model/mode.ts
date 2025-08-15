import {
  contactFormSchemaEmail,
  contactFormSchemaPhonenumber,
} from "@/widgets/contact-form/model/form"

enum ContactFormMode {
  EMAIL = "email",
  PHONENUMBER = "phonenumber",
}

const ContactFormModeSchema = {
  [ContactFormMode.EMAIL]: contactFormSchemaEmail,
  [ContactFormMode.PHONENUMBER]: contactFormSchemaPhonenumber,
}

export { ContactFormMode, ContactFormModeSchema }
