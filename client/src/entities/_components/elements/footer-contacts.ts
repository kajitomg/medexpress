import { AddressComponent } from "@/entities/_components/shared/address"
import { EmailComponent } from "@/entities/_components/shared/email"
import { PhonenumberComponent } from "@/entities/_components/shared/phonenumber"
import { WorkingScheduleComponent } from "@/entities/_components/shared/working-schedule"
import { StrapiComponent, StrapiComponentBase } from "@/shared/model/strapi"

export interface FooterContactsComponent
  extends StrapiComponentBase<"elements.footer-contacts"> {
  title: string
  email: StrapiComponent<EmailComponent>
  phonenumber: StrapiComponent<PhonenumberComponent>
  address: StrapiComponent<AddressComponent>
  workingSchedule: StrapiComponent<WorkingScheduleComponent>
}
