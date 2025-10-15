import { WorkingSchedule } from "@/entities/working-schedule/model"
import {
  StrapiComponentBase,
  StrapiExtended,
  StrapiMedia,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface WorkingScheduleComponent
  extends StrapiComponentBase<"shared.working-schedule"> {
  title?: string
  icon?: StrapiExtended<StrapiMedia>
  body?: StrapiRelation<WorkingSchedule>
}
