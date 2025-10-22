import { WorkingSchedule } from "@/entities/working-schedule/model"
import {
  ImageMedia,
  StrapiComponentBase,
  StrapiMedia,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface WorkingScheduleComponent
  extends StrapiComponentBase<"shared.working-schedule"> {
  title: StrapiOptional<string>
  icon: StrapiOptional<StrapiMedia<ImageMedia>>
  body: StrapiOptional<StrapiRelation<WorkingSchedule>>
}
