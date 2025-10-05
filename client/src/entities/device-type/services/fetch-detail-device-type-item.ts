"use server"

import { fetchDeviceTypeItemBySlug } from "@/entities/device-type/api"

const fetchDetailDeviceTypeItem = async (slug: string) => {
  return await fetchDeviceTypeItemBySlug(slug)
}

export { fetchDetailDeviceTypeItem }
