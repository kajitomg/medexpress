import { AddressComponent } from "@/entities/_components/shared/address"
import { EmailComponent } from "@/entities/_components/shared/email"
import { PhonenumberComponent } from "@/entities/_components/shared/phonenumber"
import { SocialComponent } from "@/entities/_components/shared/social"
import { WorkingScheduleComponent } from "@/entities/_components/shared/working-schedule"
import { StrapiComponent, StrapiComponentBase } from "@/shared/model/strapi"

export interface ContactsDetailsComponent
  extends StrapiComponentBase<"elements.contacts-details"> {
  email: StrapiComponent<EmailComponent>
  phonenumber: StrapiComponent<PhonenumberComponent>
  address: StrapiComponent<AddressComponent>
  workingSchedule: StrapiComponent<WorkingScheduleComponent>
  social: StrapiComponent<SocialComponent>
}
