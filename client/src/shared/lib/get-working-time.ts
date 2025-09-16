import {
  ScheduleDays,
  WorkingScheduleItem,
} from "@/shared/model/strapi/shared/working-schedule"

export { getWorkingTime }

type WorkSchedule =
  | { uniform: true; start: string; end: string }
  | {
      uniform: false
      days: { day: ScheduleDays; start: string; end: string }[]
    }

function getWorkingTime(days?: WorkingScheduleItem[]): WorkSchedule | null {
  if (!days) return null
  const workingDays = days.filter((d) => d.type === "Рабочий")

  if (workingDays.length === 0) {
    return { uniform: true, start: "", end: "" }
  }

  const { start: firstStart, end: firstEnd } = workingDays[0]

  const allSame = workingDays.every(
    (d) => d.start === firstStart && d.end === firstEnd
  )

  if (allSame) {
    return { uniform: true, start: firstStart, end: firstEnd }
  } else {
    return {
      uniform: false,
      days: workingDays.map((d) => ({
        day: d.day,
        start: d.start,
        end: d.end,
      })),
    }
  }
}
