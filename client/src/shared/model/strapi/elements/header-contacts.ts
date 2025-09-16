import { Email } from "@/shared/model/strapi/shared/email"
import { Phonenumber } from "@/shared/model/strapi/shared/phonenumber"
import { WorkingSchedule } from "@/shared/model/strapi/shared/working-schedule"

export type HeaderContacts = {
  __component: "elements.header-contacts"
  email: Email
  phonenumber: Phonenumber
  workingSchedule: WorkingSchedule
  contactButton: string
}
