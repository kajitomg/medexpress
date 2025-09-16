export function formatTime(time: string): string {
  const [hoursRaw, minutesRaw] = time.split(":")
  const hours = Number(hoursRaw)
  const minutes = Number(minutesRaw)

  if (minutes === 0) {
    return String(hours) // 9
  }

  return `${hours}:${minutes.toString().padStart(2, "0")}`
}
