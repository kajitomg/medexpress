const PAD = 4

export function toSortCode(code) {
  if (typeof code !== "string") code = String(code ?? "")
  return code
    .split(".")
    .map(seg => {
      const n = Number.parseInt(seg, 10)
      if (Number.isNaN(n)) throw new Error(`Invalid code segment: "${seg}"`)
      return String(n).padStart(PAD, "0")
    })
    .join(".")
}