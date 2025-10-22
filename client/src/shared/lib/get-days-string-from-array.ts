import {
  DayType,
  ScheduleDayComponent,
  ScheduleDays,
} from "@/entities/_components"
import { StrapiOptional } from "@/shared/model/strapi"

type Variants = "full" | "simple"
type Dividers = " - " | ", "

type Alphabet<T = string> = Record<ScheduleDays, T>

type Options = {
  type?: DayType
  variant?: Variants
  divider?: Dividers
  alphabet?: Alphabet
}

const defaultAlphabet: Alphabet<ScheduleDays> = {
  Понедельник: "Понедельник",
  Вторник: "Вторник",
  Среда: "Среда",
  Четверг: "Четверг",
  Пятница: "Пятница",
  Суббота: "Суббота",
  Воскресенье: "Воскресенье",
}

const defaultOptions: Options = {
  type: "Рабочий",
  divider: " - ",
  variant: "simple",
  alphabet: defaultAlphabet,
}

function getDayLabel(
  day: ScheduleDays,
  customMap?: Partial<Record<ScheduleDays, string>>
): string {
  return customMap?.[day] ?? defaultAlphabet[day]
}

const getDaysStringFromArray = (
  days?: StrapiOptional<ScheduleDayComponent[]>,
  options?: Options
) => {
  options = { ...defaultOptions, ...options }
  if (!days) return null
  days = days.filter((day) => day.type === options.type)

  if (options.variant === "simple") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    days = days.filter((day, index) => index === 0 || index === days.length - 1)
  }

  const result = days.map((day) => getDayLabel(day.day, options?.alphabet))
  return result.join(options.divider)
}

export { getDaysStringFromArray }
