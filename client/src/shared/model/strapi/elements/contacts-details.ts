import { Address } from "@/shared/model/strapi/shared/address"
import { Email } from "@/shared/model/strapi/shared/email"
import { Phonenumber } from "@/shared/model/strapi/shared/phonenumber"
import { Social } from "@/shared/model/strapi/shared/social"
import { WorkingSchedule } from "@/shared/model/strapi/shared/working-schedule"

export type ContactsDetails = {
  __component: "elements.contacts-details"
  email: Email
  phonenumber: Phonenumber
  address: Address
  workingSchedule: WorkingSchedule
  social: Social
}
