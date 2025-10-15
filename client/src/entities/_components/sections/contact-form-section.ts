import { ContactFormComponent } from "@/entities/_components/shared/contact-form"
import { EmailComponent } from "@/entities/_components/shared/email"
import { PhonenumberComponent } from "@/entities/_components/shared/phonenumber"
import { StrapiComponent, StrapiComponentBase } from "@/shared/model/strapi"

export interface ContactFormSectionComponent
  extends StrapiComponentBase<"sections.contact-form"> {
  display: string
  email: StrapiComponent<EmailComponent>
  phonenumber: StrapiComponent<PhonenumberComponent>
  contactForm: StrapiComponent<ContactFormComponent>
}
