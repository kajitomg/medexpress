export function getPaginationRange(
  current: number,
  total: number
): (number | null)[] {
  const delta = 1
  const range: (number | null)[] = []
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  range.push(1)

  if (left > 2 && total > 2) range.push(null)

  for (let i = left; i <= right; i++) {
    range.push(i)
  }

  if (right < total - 1) range.push(null)

  if (total > 1) range.push(total)

  return range
}
