import { ScheduleDayComponent } from "@/entities/_components/shared/schedule-day"
import { StrapiBase, StrapiComponent } from "@/shared/model/strapi"

export interface WorkingSchedule extends StrapiBase {
  days: StrapiComponent<ScheduleDayComponent[]>
}
