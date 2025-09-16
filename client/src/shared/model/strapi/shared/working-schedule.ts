import { DocumentId, Media } from "@/shared/model"

export type ScheduleDays =
  | "Понедельник"
  | "Вторник"
  | "Среда"
  | "Четверг"
  | "Пятница"
  | "Суббота"
  | "Воскресенье"
export type DayType = "Рабочий" | "Выходной"

export type WorkingScheduleItem = {
  id: DocumentId
  day: ScheduleDays
  type: DayType
  start: string
  end: string
}

export type WorkingSchedule = {
  __component: "shared.working-schedule"
  title?: string
  icon?: Media
  body?: { days?: WorkingScheduleItem[] }
}
