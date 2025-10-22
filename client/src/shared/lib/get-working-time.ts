import { ScheduleDayComponent } from "@/entities/_components"
import { StrapiOptional } from "@/shared/model/strapi"

export { getWorkingTime }

type WorkSchedule =
  | ({ uniform: true } & Pick<ScheduleDayComponent, "start" | "end">)
  | {
      uniform: false
      days: StrapiOptional<
        Pick<ScheduleDayComponent, "day" | "start" | "end">[]
      >
    }

function getWorkingTime(
  days?: StrapiOptional<ScheduleDayComponent[]>
): WorkSchedule | null {
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
