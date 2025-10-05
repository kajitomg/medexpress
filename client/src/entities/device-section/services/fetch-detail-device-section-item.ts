"use server"

import { fetchDeviceSectionItemBySlug } from "@/entities/device-section/api"

const fetchDetailDeviceSectionItem = async (slug: string) => {
  return await fetchDeviceSectionItemBySlug(slug)
}

export { fetchDetailDeviceSectionItem }
