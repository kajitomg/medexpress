import { Address } from "@/shared/model/strapi/shared/address"
import { Email } from "@/shared/model/strapi/shared/email"
import { Phonenumber } from "@/shared/model/strapi/shared/phonenumber"
import { WorkingSchedule } from "@/shared/model/strapi/shared/working-schedule"

export type FooterContacts = {
  __component: "elements.footer-contacts"
  title: string
  email: Email
  phonenumber: Phonenumber
  address: Address
  workingSchedule: WorkingSchedule
}
