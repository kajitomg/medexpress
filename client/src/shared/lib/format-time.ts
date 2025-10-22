import { StrapiOptional } from "@/shared/model/strapi"

export function formatTime(
  time: StrapiOptional<string>
): StrapiOptional<string> {
  if (!time) return null
  const [hoursRaw, minutesRaw] = time.split(":")
  const hours = Number(hoursRaw)
  const minutes = Number(minutesRaw)

  if (minutes === 0) {
    return String(hours)
  }

  return `${hours}:${minutes.toString().padStart(2, "0")}`
}
