import { DeviceSectionBase } from "@/entities/device-section/model"

export const hasSlug = (
  section: DeviceSectionBase,
  targetSlug?: string
): boolean => {
  if (section.slug === targetSlug) {
    return true
  }

  if (!section.childrens || section.childrens.length === 0) {
    return false
  }

  for (const child of section.childrens) {
    if (hasSlug(child, targetSlug)) {
      return true
    }
  }

  return false
}
