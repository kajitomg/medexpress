import { StrapiComponentBase } from "@/shared/model/strapi"

export type ScheduleDays =
  | "Понедельник"
  | "Вторник"
  | "Среда"
  | "Четверг"
  | "Пятница"
  | "Суббота"
  | "Воскресенье"

export type DayType = "Рабочий" | "Выходной"

export interface ScheduleDayComponent
  extends StrapiComponentBase<"shared.schedule-day"> {
  day: ScheduleDays
  type: DayType
  start: string
  end: string
}
