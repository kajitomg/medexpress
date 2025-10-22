"use server"

import { fetchDeviceTypeItemBySlug } from "@/entities/device-type/api"
import { DeviceTypeBase } from "@/entities/device-type/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchDetailDeviceTypeItem = async (slug: string) => {
  const queryObj = {
    populate: {
      sections: true,
    },
  } satisfies StrapiQuery<DeviceTypeBase>

  return await fetchDeviceTypeItemBySlug(slug, queryObj)
}

export { fetchDetailDeviceTypeItem }
