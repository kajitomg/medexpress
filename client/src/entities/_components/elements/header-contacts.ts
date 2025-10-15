import { EmailComponent } from "@/entities/_components/shared/email"
import { PhonenumberComponent } from "@/entities/_components/shared/phonenumber"
import { WorkingScheduleComponent } from "@/entities/_components/shared/working-schedule"
import { StrapiComponent, StrapiComponentBase } from "@/shared/model/strapi"

export interface HeaderContactsComponent
  extends StrapiComponentBase<"elements.header-contacts"> {
  email: StrapiComponent<EmailComponent>
  phonenumber: StrapiComponent<PhonenumberComponent>
  workingSchedule: StrapiComponent<WorkingScheduleComponent>
  contactButton: string
}
