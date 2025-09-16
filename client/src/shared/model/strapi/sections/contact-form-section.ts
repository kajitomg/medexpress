import { ContactForm } from "@/shared/model/strapi/shared/contact-form"
import { Email } from "@/shared/model/strapi/shared/email"
import { Phonenumber } from "@/shared/model/strapi/shared/phonenumber"

export type ContactFormSection = {
  __component: "sections.contact-form"
  display: string
  email: Email
  phonenumber: Phonenumber
  contactForm: ContactForm
}
